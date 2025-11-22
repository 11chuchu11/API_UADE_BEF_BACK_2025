export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IReqUserLoginDTO = Pick<IUser, 'username' | 'password'>;
export type IReqUserRegisterDTO = Pick<IUser, 'email' | 'username' | 'password'>;

export class ReqUserLoginDTO implements IReqUserLoginDTO {
  username: string;
  password: string;

  constructor(data: any) {
    this.username = data.username;
    this.password = data.password;
  }
}

export class ReqUserRegisterDTO implements IReqUserRegisterDTO {
  email: string;
  username: string;
  password: string;

  constructor(data: any) {
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
  }
}

export type IResUserLoginDTO = Pick<IUser, 'username' | 'email' | 'id'>;
export type IResUserRegisterDTO = Omit<IUser, 'password'>;

export class ResUserLoginDTO implements IResUserLoginDTO {
  username: string;
  email: string;
  id: number;
  token: string;

  constructor(data: any) {
    this.username = data.username;
    this.email = data.email;
    this.id = data.id;
    this.token = data.token;
  }
}

export class ResUserRegisterDTO implements IResUserRegisterDTO {
  username: string;
  email: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.username = data.username;
    this.email = data.email;
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
