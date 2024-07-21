import jwt from 'jsonwebtoken';
import { Response } from 'express';
import User from '../../models/User';
import authConfig from '../../config/auth';

interface RefreshTokenResponse {
  user: any;
  newToken: string;
  refreshToken: string;
}

export const RefreshTokenService = async (res: Response, token: string): Promise<RefreshTokenResponse> => {
  let payload: any = null;

  try {
    payload = jwt.verify(token, authConfig.secret);
  } catch (err) {
    throw new Error('Invalid refresh token');
  }

  const user = await User.findOne({ userId: payload.id });

  if (!user) {
    throw new Error('User not found');
  }

  const newToken = jwt.sign({ id: user._id, username: user.username, email: user.email }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });

  const refreshToken = jwt.sign({ id: user._id, username: user.username, email: user.email }, authConfig.secret, {
    expiresIn: '7d',
  });

  return { user, newToken, refreshToken };
};
