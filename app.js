import path from "path";
import fs from "fs";
import cluster from "cluster";
import os from "os";

import express from "express";
import multer from "multer";
import conn from "./config/database.js";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
//all error controllers imported here
import { corsError } from "./middleware/error-handlers/cors-error.js";
import { centralError } from "./middleware/error-handlers/central-error.js";

//all routes imported here
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const cpu = os.cpus().length;

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const port = process.env.PORT || 3300;

const app = express();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < cpu; i++) {
    cluster.fork();
  }
  console.log(cpu);
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  //multer file storage
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "image") {
        let dir = "./images";
        //this will create the folder if not exists
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        cb(null, dir);
      } else if (file.fieldname === "icon") {
        let dir = "./icons";
        //this will create the folder if not exists
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        cb(null, dir);
      }
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, "-") +
          "-" +
          file.originalname.toString().replace(/\s/g, "-")
      );
    },
  });

  //multer file filter
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  //defining absolute path of current WORKDIR
  const __dirname = path.resolve();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(__dirname));
  app.use(express.static(path.join(__dirname, "public")));

  // multer configuration
  app.use(
    multer({
      storage: fileStorage,
      fileFilter: fileFilter,
    }).fields([
      {
        name: "image",
        maxCount: 5,
      },
      {
        name: "icon",
        maxCount: 1,
      },
    ])
  );

  app.use("/images", express.static(path.join(__dirname, "images")));
  app.use("/icons", express.static(path.join(__dirname, "images")));
  //handle cors error
  app.use(corsError);

  app.get("/", (req, res) => {
    res.status(200).json({
      msg: "Server is running🔥🔥🔥",
    });
  });
  //all routes entrypoint here
  app.use("/auth", authRoutes);
  app.use("/admin", adminRoutes);
  app.use("/app", userRoutes);

  app.use(helmet());
  app.use(compression());

  //central error handler here
  app.use(centralError);

  // sync with database
  conn
    .then(() => {
      app.listen(port, () => console.log(`Connected and Running on ${port}`));
    })
    .catch((e) => console.log(e.message));
}
