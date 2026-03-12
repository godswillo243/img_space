import { Handler } from "express";
import { createHttpError, getEnv } from "../utils";
import jwt from "jsonwebtoken";

export const requireAuth: Handler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw createHttpError("Unauthorized", 401);

  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, getEnv("JWT_ACCESS_SECRET"));
  if (!decoded) throw createHttpError("Unauthorized", 401);

  (req as any).userId = (decoded as any).userId;

  next();
};
