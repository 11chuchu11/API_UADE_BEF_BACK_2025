import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../config';
import {
  ReqUserLoginDTO,
  ReqUserRegisterDTO,
  ResUserLoginDTO,
  ResUserRegisterDTO,
} from '../../dtos/User';
import UserRepository from '../../repositories/data/UserRepository';

class AuthService {
  async login(userData: ReqUserLoginDTO): Promise<ResUserLoginDTO> {
    const user = await UserRepository.findUserByUsername(userData.username);
    const passwordCorrect = user ? await compare(userData.password, user.password) : false;

    if (!(user && passwordCorrect)) {
      throw new Error('Invalid username or password');
    }

    const userForToken = { username: user.username, email: user.email, id: user.id };
    const token = jwt.sign(userForToken, JWT_SECRET);

    return new ResUserLoginDTO({ ...userForToken, token });
  }

  async register(userData: ReqUserRegisterDTO): Promise<ResUserRegisterDTO> {
    if (await UserRepository.findUserByUsername(userData.username)) {
      throw new Error('Username already exists');
    }

    userData.password = await hash(userData.password, 10);
    const user = await UserRepository.createUser(userData);

    return new ResUserRegisterDTO(user);
  }
}

export default new AuthService();
