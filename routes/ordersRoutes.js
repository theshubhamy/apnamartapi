const express = require("express");
const { read, create, readOne, update } = require("../helpers/helper");
const Order = require("../models/Order");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).json({
    data: await read(req, Order),
  });
});

router.get("/:id", async (req, res) => {
  return res.status(200).json({
    data: await readOne(req, Order),
  });
});

router.post("/", async (req, res) => {
  return res.status(201).json({
    data: await create(req, Order),
  });
});

router.put("/:id", async (req, res) => {
  const { status } = req.body;
  delete req.body;
  req.body = {};
  req.body.status = status;
  if (!status)
    return res
      .status(404)
      .json({ msg: "Failed to update order. Missing status." });
  return res.status(200).json({ old_record: await update(req, Order) });
});

module.exports = router;
