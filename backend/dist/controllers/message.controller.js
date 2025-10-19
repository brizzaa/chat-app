import User from "../models/user.model";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";
import { getReceiverSocketId } from "../lib/socket";
import { io } from "../lib/socket";
export const getUsersforSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user?._id;
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId },
        }).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "errore server",
        });
    }
};
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user?._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });
        res.status(200).json(messages);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "errore server",
        });
    }
};
export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { text, image } = req.body;
        const senderId = req.user?._id;
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error("Errore nell'invio del messaggio:", error);
        res.status(500).json({
            message: "Errore server durante l'invio del messaggio",
        });
    }
};
//# sourceMappingURL=message.controller.js.map