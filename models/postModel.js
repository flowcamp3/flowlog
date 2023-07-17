// models/postModel.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  title: String,
  date: String,
  content: String,
});

PostSchema.index({ blogId: 1, postId: 1 }, { unique: true });


export default mongoose.models.Post || mongoose.model("Post", PostSchema);
