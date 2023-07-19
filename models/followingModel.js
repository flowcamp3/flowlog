// models/followingModel.js
import mongoose from "mongoose";

const FollowingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  followings: [
    {
      email: String,
    },
  ],
});

export default mongoose.models.Following ||  mongoose.model("Following", FollowingSchema);
