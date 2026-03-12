import { Router } from "express";
import {
  createImage,
  deleteImage,
  getImage,
  getImageFeed,
  getUserImages,
  handleCloudinaryUploadSignature,
  handleDeleteUpload,
} from "../handlers/image.handlers";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/new", requireAuth, createImage);
router.get("/feed", getImageFeed);
router.get("/sign-upload", requireAuth, handleCloudinaryUploadSignature);
router.delete("/upload/:publicId", requireAuth, handleDeleteUpload);
router.get("/:id/image", getImage);
router.get("/user/:userId", getUserImages);
router.delete("/:id/image", requireAuth, deleteImage);

export default router;
