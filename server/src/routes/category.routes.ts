import { Router } from "express";
import { getCategories, createCategory } from "../handlers/category.handler";

const router = Router();

router.get("/", getCategories);
router.post("/", createCategory);

export default router;
