import mongoose from "mongoose";

const messageScherma = new mongoose.Schema(
  {
    senderId: {
      type: Object,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Object,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", messageScherma);

export default Message;
