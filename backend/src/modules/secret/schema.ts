import {makeExecutableSchema, gql} from 'apollo-server-koa';
import {Context} from "koa";
import {ISecret, ISecretCfg} from "./model";
import {getUserId} from '../../utils/sessionUtils';
import {createSecret, deleteSecret, getSecretList, updateSecret} from "./service";

const typeDefs = gql`
  type Secret {
    _id: String
    userId: String
    siteName: String!
    url: String
    userName: String!
    decryptPassword: String!
    note: String
  }
  input SecretInput {
    _id: String
    userId: String
    siteName: String!
    url: String
    userName: String!
    decryptPassword: String!
    note: String
  }
  
  type Query {
    secrets: [Secret!]!
  }
  type Mutation {
    addSecret(secretCfg: SecretInput): Secret
    updateSecret(secretCfg: SecretInput): Secret
    deleteSecret(id: String): Boolean
  }
`;

const resolvers = {
  Query: {
    secrets: (parent: any, args: {cfg: ISecret}, context: {ctx: Context}) => {
      const userId = getUserId(context.ctx);
      return getSecretList(userId);
    }
  },
  Mutation: {
    addSecret: (parent: any, args: {secretCfg: ISecretCfg}, context: {ctx: Context}) => {
      const userId = getUserId(context.ctx);
      const secretCfg = args.secretCfg;
      secretCfg.userId = userId;
      return createSecret(secretCfg);
    },
    updateSecret: (parent: any, args: {secretCfg: ISecret}, context: {ctx: Context}) => {
      const userId = getUserId(context.ctx);
      const {secretCfg} = args;
      if(userId === secretCfg.userId){
        return updateSecret(secretCfg)
      } else {
        throw new Error("not permission");
      }
    },
    deleteSecret:  (parent: any, args: {id: string}) => {
      return deleteSecret(args.id);
    }
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
