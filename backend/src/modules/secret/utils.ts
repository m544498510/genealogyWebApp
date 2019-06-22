import {createCipheriv, createDecipheriv} from "crypto";
const KEY = Buffer.from('secretKeyMxlmxlm', 'utf8');
const IV = Buffer.from('initialVectorMxl', 'utf8');

export function aesEncrypt(data: string): string {
  const cipher = createCipheriv('AES128', KEY, IV);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function aesDecrypt(encrypted: string): string {
  const decipher = createDecipheriv('AES128', KEY, IV);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
