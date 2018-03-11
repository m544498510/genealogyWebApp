import {model} from "mongoose";

import {mongoSchema, IUser} from './types';

const userModel = model<IUser>('User', mongoSchema);

export async function getUserList(): Promise<IUser[]> {
  return await userModel.find();
}

export async function getUser(name: String, password: String): Promise<IUser | undefined> {
  const userList = await userModel.find({name, password});
  return userList[0]
}

export async function getUserById(id: String): Promise<IUser | null> {
  return await userModel.findById(id);
}

export async function createUser(name: String, password: String): Promise<IUser> {
  const newUser = new userModel({name, password});
  return await newUser.save();
}

export async function updateUser(id: String, password: String): Promise<IUser | null> {
  const user = await userModel.findById(id);
  if(user){
    user.set({password});
    return await user.save();
  } else {
    return null;
  }
}

export async function deleteUser(id: String): Promise<boolean> {
  const user = userModel.findById(id);
  if(user){
    const result = await user.remove();
    return result.n === 1 && result.ok === 1;
  }else{
    return false;
  }
}
