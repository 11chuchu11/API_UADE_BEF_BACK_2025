import { User } from '@prisma/client';

import { IReqUserRegisterDTO } from '../../../dtos/User';
import { prisma } from '../../../utils/prisma';
import { IUserRepository } from '../../interfaces/UserRepository';

class UserRepository implements IUserRepository {
  findUserByUsername(username: string): Promise<User | null> {
    try {
      return prisma.user.findUnique({
        where: { username },
      });
    } catch (error) {
      throw new Error(`BBDD Error: ${error}`);
    }
  }
  createUser(user: IReqUserRegisterDTO): Promise<User> {
    try {
      return prisma.user.create({
        data: {
          username: user.username,
          password: user.password,
          email: user.email,
        },
      });
    } catch (error) {
      throw new Error(`BBDD Error: ${error}`);
    }
  }
}

export default new UserRepository();
