const express = require("express");
const router = express.Router();
const Category = require("../schema/category");
const {
  CreateErrorRes,
  CreateSuccessRes,
} = require("../utils/responseHandler");

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find({ isDeleted: false });
    CreateSuccessRes(res, categories, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!category) {
      return CreateErrorRes(res, "Not found", 404);
    }
    CreateSuccessRes(res, category, 200);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    await newCategory.save();
    CreateSuccessRes(res, newCategory, 201);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updatedCategory) {
      return CreateErrorRes(res, "Not found", 404);
    }
    CreateSuccessRes(res, updatedCategory, 200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedCategory) {
      return CreateErrorRes(res, "Not found", 404);
    }
    CreateSuccessRes(res, deletedCategory, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
