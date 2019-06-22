import {Document, model, Schema} from "mongoose";

export const modelName = 'User';
export const mongoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  nikeName: {
    type: String,
    required: true,
  },
});

export interface IUser extends Document {
  _id: string,
  name: string,
  password: string,
  nikeName: string,
}

export default model<IUser>(modelName, mongoSchema);
