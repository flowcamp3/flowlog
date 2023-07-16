import mongoose from "mongoose";

const GuestbookSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
    unique: true,
  },
  visitorId: {
    type: String,
    required: true,
    unique: true,
  },
  date: Date,
  content: String,
});

export default mongoose.models.Guestbook ||
  mongoose.model("Guestbook", GuestbookSchema);
