import { ISecret, ISecretCfg } from './model';
import * as secretDao from './dao';
import {aesEncrypt} from "./utils";

export function createSecret(secretCfg: ISecretCfg): Promise<ISecret> {
  secretCfg.encryptPassword = aesEncrypt(secretCfg.decryptPassword);
  return secretDao.createSecret(secretCfg);
}

export function getSecretList(userId: string): Promise<ISecret[]> {
  return secretDao.getSecretListByUser(userId);
}

export function updateSecret(secret: ISecret): Promise<ISecret> {
  secret.encryptPassword = aesEncrypt(secret.decryptPassword);
  return secretDao.updateSecret(secret._id, secret);
}

export function deleteSecret(id: string): Promise<boolean> {
  return secretDao.deleteSecret(id);
}
