import {makeExecutableSchema, gql} from 'apollo-server-koa';
import {getUserByName} from './service';
import {Context} from "koa";

const typeDefs = gql`
  type User {
    name: String
    nikeName: String 
  }
  type Query {
    User(name: String): User
  }
`;

const resolvers = {
  Query: {
    User: (parent: object, args: {name: string}, context: {ctx: Context}, info: object) => getUserByName(args.name)
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
