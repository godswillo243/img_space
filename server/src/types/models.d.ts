import { Document, Schema } from "mongoose";
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

interface IImage {
  url: string;
  user: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  tags: string[];
  title: string;
  description: string;
  likes: Schema.Types.ObjectId[];
}
