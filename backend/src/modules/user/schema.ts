import {makeExecutableSchema, gql} from 'apollo-server-koa';
import {createUser} from './service';
import {Context} from "koa";
import {getUserInfo} from "../../utils/sessionUtils";

const typeDefs = gql`
  type User {
    name: String!
    nikeName: String!
  }
  type Query {
    currentUser(): User
  }
  type Mutation {
    addUser(name: String!, password: String!, nikeName: String!): User
  }
`;

const resolvers = {
  Query: {
    currentUser: (_: object, args: object, context: {ctx: Context}) => getUserInfo(context.ctx)
  },
  Mutation: {
    addUser: (parent: any, args: {
      name: string,
      password: string,
      nikeName: string
    }) => createUser(args.name, args.password, args.nikeName)
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
