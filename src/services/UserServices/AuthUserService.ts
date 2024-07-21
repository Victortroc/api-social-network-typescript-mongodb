import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import authConfig from '../../config/auth';

interface AuthUserServiceProps {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  serializedUser: any;
  refreshToken: string;
}

const AuthUserService = async ({ email, password }: AuthUserServiceProps): Promise<AuthResponse> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });

  const refreshToken = jwt.sign({ id: user._id, username: user.username, email: user.email }, authConfig.secret, {
    expiresIn: '7d',
  });

  const serializedUser = {
    id: user._id,
    username: user.username,
    email: user.email
  };

  return {
    token,
    serializedUser,
    refreshToken,
  };
};

export default AuthUserService;
