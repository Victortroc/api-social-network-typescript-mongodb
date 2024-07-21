import jwt from 'jsonwebtoken';
import User from '../../models/User';
import authConfig from '../../config/auth';

const FindUserFromToken = async (token: string) => {
  let payload: any = null;

  try {
    payload = jwt.verify(token, authConfig.secret);
  } catch (err) {
    throw new Error('Invalid token');
  }

  const user = await User.findOne({ userId: payload.id });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export default FindUserFromToken;
