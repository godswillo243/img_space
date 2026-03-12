import API from "./api";
import { getEnv } from "../lib/utils";

export const getAuthUser = async () => {
  const res = await API.get("/users/me", {});
  return res.data.user;
};

export const signUp = async (data: any) => {
  const res = await API.post("/users/sign-up", data);
  return res.data;
};
export const signIn = async (data: any) => {
  const res = await API.post("/users/sign-in", data);
  return res.data;
};

export const handleFileUpload = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", getEnv("CLOUDINARY_UPLOAD_PRESET"));
  const signRes = await API.get("/images/sign-upload", {});
  const { timestamp, signature } = await signRes.data;

  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("api_key", getEnv("CLOUDINARY_API_KEY"));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${getEnv("CLOUDINARY_CLOUD_NAME")}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
  if (!response.ok) throw new Error(`Upload failed`);
  const data = await response.json();
  return data;
};

export const handleDeleteUpload = async (publicId: string) => {
  const res = await API.delete(`/images/upload/${publicId}`, {});
  return res.data;
};

export const handleCreateImage = async (data: any) => {
  const res = await API.post("/images/new", data, {});
  return res.data;
};

export const getImage = async (id: string) => {
  try {
    const res = await API.get("/images/" + id + "/image", {});

    return res.data.image;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getImageFeed = async () => {
  try {
    const res = await API.get("/images/feed");

    return res.data || { images: [] };
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUser = async (id: string) => {
  try {
    const res = await API.get("/users/" + id || "me", {});

    return res.data.user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserImages = async (id: string) => {
  try {
    const res = await API.get("/images/user/" + id, {});

    return res.data.images;
  } catch (error) {
    console.log(error);
    return null;
  }
};
