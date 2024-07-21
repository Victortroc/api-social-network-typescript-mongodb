import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import authConfig from "../config/auth";

interface TokenPayload {
    id: string;
    username: string;
    email: string;
    iat: number;
    exp: number;
}

interface CustomRequest extends Request {
    user?: {
        id: string;
        username: string;
        email: string;
    };
}

const isAuth = (req: CustomRequest, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret) as TokenPayload;
    const { id, username, email } = decoded;
    req.user = { id, username, email };
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};

export default isAuth;
