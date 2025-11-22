import { User } from '@prisma/client';

import { IReqUserRegisterDTO } from '../../../dtos/User';

export interface IUserRepository {
  findUserByUsername(username: string): Promise<User | null>;
  createUser(user: IReqUserRegisterDTO): Promise<User>;
}
