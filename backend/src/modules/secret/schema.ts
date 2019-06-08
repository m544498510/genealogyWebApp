import {makeExecutableSchema, gql} from 'apollo-server-koa';
import {Context} from "koa";
import {ISecret, ISecretCfg} from "./model";
import {getUserId} from '../../utils/sessionUtils';
import {createSecret, deleteSecret, getSecretList, updateSecret} from "./service";

const typeDefs = gql`
  type Secret {
    _id?: String
    userId: string
    siteName: string
    url?: string
    name: string
    decryptPassword: string
    note?: string
  }
  type Query {
    secrets: [Secret]
  }
  type Mutation {
    addSecret(secretCfg: Secret): Secret
    updateSecret(secretCfg: Secret): Secret
    deleteSecret(id: String): Void
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
    updateSecret: (parent: any, args: {secret: ISecret}, context: {ctx: Context}) => {
      const userId = getUserId(context.ctx);
      const {secret} = args;
      if(userId === secret.userId){
        return updateSecret(secret)
      } else {
        throw new Error("not permission");
      }
    },
    deleteSecret:  (parent: any, args: {id: string}, context: {ctx: Context}) => {
      //const userId = getUserId(context.ctx);
      return deleteSecret(args.id);
    }
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
