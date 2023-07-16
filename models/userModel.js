// models/userModel.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  blogId: {
    type: String,
    required: true,
    unique: true,
  },
  blogName: {
    type: String,
    required: true,
    unique: true,
  },
  postIds: [String],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
