import { Request, Response } from "express";
import Message from "../models/Message";

export const index = async (req: Request, res: Response): Promise<Response> => {
    const { postId } = req.params;
    try {
        const messages = await Message.find({ postId }).sort({ createdAt: -1 });
        return res.json(messages);
    } catch (error) {
        return res.status(500).json({ error: 'Error listing messages' });
    }
};

export const store = async (req: Request, res: Response): Promise<Response> => {
    const { postId } = req.params;
    const { userId, content } = req.body;
    const medias = req.files as Express.Multer.File[];

    const mediaUrls = medias?.map((file) => `/uploads/${file.filename}`) || [];

    try {
        const newMessage = new Message({
            postId,
            userId,
            content,
            mediaUrls,
            createdAt: new Date(),
        });
        await newMessage.save();
        return res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating message' });
    }
};
