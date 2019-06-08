import SecretModel, {ISecret, ISecretCfg} from "./model";

export function getSecretById(secretId: string): Promise<ISecret | null> {
  return SecretModel.findById(secretId).exec();
}

export function getSecretListByUser(userId: string):Promise<ISecret[]>{
  return SecretModel.find({userId: userId}).exec();
}

export async function createSecret(secretCfg: ISecretCfg): Promise<ISecret>{
  const model = new SecretModel(secretCfg);
  const secret = await model.save();
  if(secret){
    return secret;
  }else{
    throw new Error('create failed');
  }
}

export async function updateSecret(secretId: string, secret: ISecretCfg): Promise<ISecret> {
  const oldSecret = await SecretModel.findById(secretId).exec();
  if(oldSecret){
    oldSecret.set(secret);
    const newSecret = await oldSecret.save();
    if(newSecret){
      return newSecret;
    }else{
      throw new Error('save secret failed');
    }
  } else {
    throw new Error('can not find secret by id');
  }
}

export async function deleteSecret(id: string): Promise<boolean> {
  const secret = SecretModel.findById(id);
  if(secret){
    const result = await secret.remove();
    if( result.n === 1 && result.ok === 1){
      return true;
    }else{
      throw new Error('delete failed');
    }
  }else{
    throw new Error('can not find secret by id');
  }
}

