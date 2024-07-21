import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';

export const index = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Error listing users' });
    }
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    const { username, email, password } = req.body as IUser;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        await newUser.save();
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating user' });
    }
};
