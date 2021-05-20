import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
  login: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ login, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { login } });

    if (!user) {
      throw new Error('Nome de usuário ou senha incorretos');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Nome de usuário ou senha incorretos');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    delete (user as any).password;

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
