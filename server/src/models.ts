import mongoose, { Schema, Document, model } from "mongoose";
import type { IImage, IUser } from "./types/models";

const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const imageSchema = new Schema<IImage>(
  {
    url: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [String],
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    likes: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", UserSchema);
export const Image = model<IImage>("Image", imageSchema);
export const Category = model("Category", categorySchema);
