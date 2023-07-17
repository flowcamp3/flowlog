import mongoose from "mongoose";

const GuestbookSchema = new mongoose.Schema({
  blogId: String,
  visitorId: String,
  date: Date,
  content: String,
});

export default mongoose.models.Guestbook ||
  mongoose.model("Guestbook", GuestbookSchema);
