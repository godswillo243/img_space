import { Category } from "../models";
import { asyncHandler, createHttpError } from "../utils";

export const getCategories = asyncHandler(async (req, res) => {
  const { q } = req.query;

  const categories = await Category.find();
  const result = q
    ? categories.filter((category) =>
        category.name.toLowerCase().includes((q as string).toLowerCase()),
      )
    : categories;
  res.status(200).json({ categories: result });
});
export const createCategory = asyncHandler(async (req, res) => {
  if (!req.body.name) throw createHttpError("Name is required", 400);
  const name = (req.body.name as string)?.toLowerCase();
  const existing = await Category.findOne({ name });
  if (existing) throw createHttpError("Category already exists", 400);
  const category = await Category.create({ name });
  res.status(201).json({ category });
});
