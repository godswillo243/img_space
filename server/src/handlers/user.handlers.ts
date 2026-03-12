import { User } from "../models";
import { asyncHandler, createHttpError, createJWT } from "../utils";
import {
  signInValidationSchema,
  signUpValidationSchema,
} from "../utils/validations";
import bcrypt from "bcryptjs";

export const signUp = asyncHandler(async (req, res) => {
  const { success, data, error } = signUpValidationSchema.safeParse(req.body);

  if (!success) throw createHttpError(error.issues[0].message, 400);
  const { email, username, password } = data;
  const existingUser = await User.findOne({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });
  const hashedPassword = await bcrypt.hash(password, 10);
  if (existingUser) {
    const msg = `${existingUser.username == username ? "Username" : "Email"} already used`;
    throw createHttpError(msg, 403);
  }

  const user = await User.create({ ...data, password: hashedPassword });
  const { accessToken } = createJWT(user._id.toString());
  user.password = "";
  res.status(201).json({ user, accessToken });
});
export const signIn = asyncHandler(async (req, res) => {
  const { success, data, error } = signInValidationSchema.safeParse(req.body);
  if (!success) throw createHttpError(error.issues[0].message, 400);
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) throw createHttpError("Invalid credentials", 401);
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw createHttpError("Invalid credentials", 401);
  const { accessToken } = createJWT(user._id.toString());
  user.password = "";
  res.status(200).json({ user, accessToken });
});
export const getAuthUser = asyncHandler(async (req, res) => {
  console.log((req as any).userId);
  const user = await User.findById((req as any).userId).select("-password");
  if (!user) throw createHttpError("User not found", 404);

  res.status(200).json({ user });
});
export const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) throw createHttpError("User not found", 404);
  res.status(200).json({ user });
});
