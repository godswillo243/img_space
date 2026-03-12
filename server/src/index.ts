import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/database";
import userRouter from "./routes/user.routes";
import imageRouter from "./routes/image.routes";
import categoryRouter from "./routes/category.routes";
import { getEnv } from "./utils";
import { errorHandler } from "./middlewares/error";
import morgan from "morgan";
import helmet from "helmet";
import redisClient from "./lib/redis";
import EventEmitter from "events";

const app = express();
const clientUrl = getEnv("CLIENT_URL");

app.use(
  cors({
    origin: clientUrl ? [clientUrl] : "*",
    credentials: true,
  }),
);

app.options("*", cors());
app.use(morgan("dev"));
app.use(helmet({}));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/api/categories", categoryRouter);
app.use(errorHandler);

const ee = new EventEmitter();

app.listen(getEnv("PORT"), async () => {
  const mongodbConn = await connectToDatabase();
  // await redisClient.connect();
  if (mongodbConn) console.log("Connected to mongodb");
  console.log(`Server running on port ${getEnv("PORT")}`);
});
