import axios from "axios";
import { getEnv } from "../lib/utils";
import { useAuthStore } from "@/lib/store/auth-store";

export const axiosInstance = axios.create({ baseURL: getEnv("API_BASE_URL") });

const API = axios.create({ baseURL: getEnv("API_BASE_URL") });

API.interceptors.request.use((req) => {
  const token =
    useAuthStore.getState().accessToken || localStorage.getItem("accessToken");

  if (token && !req.headers.Authorization)
    req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
