import {createCipheriv, createDecipheriv} from "crypto";
const KEY = 'secret_key_mxl';

const cipher = createCipheriv('aes192', KEY, null);
const decipher = createDecipheriv('aes192', KEY, null);

export function aesEncrypt(data: string): string {
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function aesDecrypt(encrypted: string): string {
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
