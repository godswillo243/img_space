import "dotenv/config";
import { Handler } from "express";
import jwt from "jsonwebtoken";

export const getEnv = (key: string) => process.env[key] || "";

export const asyncHandler = (fn: Handler): Handler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const createHttpError = (msg: string, status: number) => {
  const message = msg || "Something went wrong";
  const error = { message, status: status || 500 };
  return error;
};

export const createJWT = (id: string) => {
  const accessToken = jwt.sign({ userId: id }, getEnv("JWT_ACCESS_SECRET"), {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign({ userId: id }, getEnv("JWT_REFRESH_SECRET"), {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
