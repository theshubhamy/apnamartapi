const express = require("express");
const {
  create,
  read,
  update,
  deleteOne,
  readOne,
} = require("../helpers/helper");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  return res.status(200).json({ data: await read(req, Category) });
});

router.get("/:id", async (req, res) => {
  return res.status(200).json({ data: await readOne(req, Category) });
});

router.post("/", async (req, res) => {
  return res.status(201).json({ category: await create(req, Category) });
});

router.put("/:id", async (req, res) => {
  return res.status(200).json({ old_record: await update(req, Category) });
});

router.delete("/:id", async (req, res) => {
  return res.status(200).json({ deleted: await deleteOne(req, Category) });
});

module.exports = router;
