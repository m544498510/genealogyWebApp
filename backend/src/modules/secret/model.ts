import {Document, model, Schema} from 'mongoose';
import {aesDecrypt} from './utils';

export const mongoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  siteName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  }
});

mongoSchema
  .virtual('decryptPassword')
  .get(function (this: ISecret) {
    return aesDecrypt(this.encryptPassword || '');
  });

export interface ISecretCfg {
  userId: string,
  siteName: string,
  url?: string,
  name: string,
  encryptPassword?: string,
  decryptPassword: string,
  note?: string,
}

export interface ISecret extends Document, ISecretCfg {
  _id: string,
}

export default model<ISecret>('Secret', mongoSchema);


