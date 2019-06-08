import {createHmac} from 'crypto';

import {IUser} from './model';
import * as userDao from './dao';

const secretKey = 'SECRET_KEY';
const secretType = 'sha256';
const digestKey = 'hex';

const secretFactory = createHmac(secretType, secretKey);

export function getUser(name: string, password: string): Promise<IUser | null> {
  const newPsd = secretFactory.update(password).digest(digestKey);
  return userDao.getUser(name, newPsd);
}

export async function createUser(name: string, password: string, nikeName: string): Promise<IUser | null> {
  const user = await userDao.getUserByName(name);
  if(!user){
    const newPsd = secretFactory.update(password).digest(digestKey);
    return userDao.createUser(name, newPsd, nikeName);
  }else{
    return null;
  }
}

export function getUserByName(name: string): Promise<IUser | null> {
  return userDao.getUserByName(name);
}

export async function getAllUser(): Promise<IUser[] | null>{
  return await userDao.getUserList()
}
