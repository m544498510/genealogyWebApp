import {model} from "mongoose";

import {mongoSchema, IUser} from './model';

const userModel = model<IUser>('User', mongoSchema);

export function getUser(name: String, password: String): Promise<IUser> {
  return userModel.find({name, password})
    .then((userList = []) => {
      return userList[0]
    });
}

export function createUser(name: String, password: String): Promise<IUser> {
  const newUser = new userModel({
    name, password
  });
  return newUser.save();
}

export function updateUser(id: String, password: String): Promise<any> {
  return userModel.findById(id)
    .then((user) => {
      user.set({password});
      return user.save();
    });

}
