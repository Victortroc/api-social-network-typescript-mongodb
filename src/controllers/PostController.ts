import { Request, Response } from "express";
import Post from '../models/Post';
import User from '../models/User';

type PostData = {
    userId: string;
    content: string;
    createdAt: string;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
    const { page, limit } = req.query;
    console.log(page, limit);

    try {
        const posts = await Post.find()
                                .sort({ createdAt: -1 })
                                .skip((Number(page) - 1) * Number(limit))
                                .limit(Number(limit));

        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ error: 'Error listing posts' });
    }
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    console.log(req.body);
    console.log(req.files);
    const { userId, content } = req.body as PostData;
    const medias = req.files as Express.Multer.File[];

    const mediaUrls = medias?.map((file) => `/public/${file.filename}`) || [];
    const { username } = await User.findOne({ _id: userId }); 

    try {
        const newPost = new Post({
            userId,
            username,
            content,
            mediaUrls,
            createdAt: new Date()
        });
        await newPost.save();
        console.log("Post criado!");
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating post' });
    }
};
