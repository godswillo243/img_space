import { createClient } from "redis";
import { getEnv } from "../utils";

const client = createClient({
  username: getEnv("REDIS_USERNAME"),
  password: getEnv("REDIS_PASSWORD"),
  socket: {
    host: getEnv("REDIS_HOST"),
    port: parseInt(getEnv("REDIS_PORT")),
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

client.on("connect", async () => {
  console.log("Redis Client Connected");
});

export default client;
