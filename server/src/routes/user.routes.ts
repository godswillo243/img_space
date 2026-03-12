import { Router } from "express";
import {
  getAuthUser,
  getUserProfile,
  signIn,
  signUp,
} from "../handlers/user.handlers";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/me", requireAuth, getAuthUser);
router.get("/:id", getUserProfile);

export default router;
