import UserModel, {IUser} from '../model';

export function getUserList(): Promise<IUser[]> {
  return UserModel.find().exec();
}

export function getUser(name: string, password: string): Promise<IUser | null> {
  return UserModel.findOne({name, password}).exec();
}

export function getUserByName(name: string): Promise<IUser | null> {
  return UserModel.findOne({name}).exec();
}

export function createUser(name: string, password: string, nikeName: string): Promise<IUser> {
  const newUser = new UserModel({name, password, nikeName});
  return newUser.save();
}

export async function updateUser(name: string, password: string): Promise<IUser | null> {
  const user = await UserModel.findOne({name}).exec();
  if(user){
    user.set({password});
    return await user.save();
  } else {
    return null;
  }
}

export async function deleteUser(name: string): Promise<boolean> {
  const user = UserModel.findOne({name});
  if(user){
    const result = await user.remove();
    return result.n === 1 && result.ok === 1;
  }else{
    return false;
  }
}
