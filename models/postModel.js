// models/postModel.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
    unique: true,
  },
  postId: String,
  title: String,
  date: String,
  content: String,
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
