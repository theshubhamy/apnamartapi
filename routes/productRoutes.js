const express = require("express");
const {
  create,
  read,
  readOne,
  update,
  deleteOne,
} = require("../helpers/helper");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  let totalItems = await Product.count();
  return res.status(200).json({
    data: await read(req, Product),
    pagination: {
      currentPage: +req.query.skip,
      totalItems,
      totalPages: Math.ceil(totalItems / +req.query.limit),
    },
  });
});

router.get("/:id", async (req, res) => {
  return res.status(200).json({ data: await readOne(req, Product) });
});

router.get("/category/:categoryId", async (req, res) => {
  return res.status(200).json({ data: await read(req, Product) });
});

router.post("/", async (req, res) => {
  return res.status(201).json({ product: await create(req, Product) });
});

router.put("/:id", async (req, res) => {
  return res.status(200).json({ old_record: await update(req, Product) });
});

router.delete("/:id", async (req, res) => {
  return res.status(200).json({ deleted: await deleteOne(req, Product) });
});

module.exports = router;
