import cloudinary from "../lib/cloudinary";
import { asyncHandler, createHttpError, getEnv } from "../utils";
import { createImageValidationSchema } from "../utils/validations";
import { Image } from "../models";

export const createImage = asyncHandler(async (req, res) => {
  const { success, data, error } = createImageValidationSchema.safeParse(
    req.body,
  );
  if (!success) throw createHttpError(error.issues[0].message, 400);

  const image = new Image({
    ...data,
    user: (req as any).userId,
  });
  await image.save();
  res.status(201).json({ image });
});
export const handleCloudinaryUploadSignature = asyncHandler(
  async (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, upload_preset: getEnv("CLOUDINARY_UPLOAD_PRESET") }, // ← params you want to enforce
      getEnv("CLOUDINARY_API_SECRET"),
    );
    res.json({ timestamp, signature });
  },
);
export const handleDeleteUpload = asyncHandler(async (req, res) => {
  const { publicId } = req.params;
  if (!publicId || typeof publicId !== "string")
    throw createHttpError("Could not find image", 404);
  const result = await cloudinary.uploader.destroy(publicId as string, {});
  res.status(200).json({ message: "Image deleted successfully" });
});
export const getUserImages = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const images = await Image.find({ user: userId as any })
    .sort({ createdAt: -1 })
    .populate("user", "username email profilePictureUrl _id");
  res.status(200).json({ images });
});
export const getImageFeed = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(40, Math.max(1, limit));
  const skip = (safePage - 1) * safeLimit;

  const images = await Image.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(safeLimit)
    .populate("user", "username email profilePictureUrl _id");

  const totalImages = await Image.countDocuments();

  const totalPages = Math.ceil(totalImages / safeLimit);
  const hasNextPage = safePage < totalPages;
  const hasPrevPage = safePage > 1;
  const pagination = {
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
  res.status(200).json({
    images,
    pagination,
  });
});
export const getImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id).populate("user", "username email");
  if (!image) throw createHttpError("Image not found", 404);
  res.status(200).json({ image });
});
export const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  if (!image) throw createHttpError("Image not found", 404);
  const publicId = image?.url?.split("/")?.pop()?.split(".")[0];

  const result = await cloudinary.uploader.destroy(publicId!);

  if (image.user.toString() !== (req as any).userId)
    throw createHttpError("Unauthorized", 401);
  await image.deleteOne();
  res.status(200).json({ image });
});

export const handleSearch = asyncHandler(async (req, res) => {
  const { q } = req.query;
});
