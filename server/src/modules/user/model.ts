import {Schema, Document} from 'mongoose';
import {GraphQLObjectType, GraphQLString} from 'graphql';

export interface IUser extends Document{
  _id: String,
  name: String,
  password: String
}

export const mongoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export const graphSchema = new GraphQLObjectType({
  name: 'User',
  description: 'User schema',
  fields: {
    _id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
});
