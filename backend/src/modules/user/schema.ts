import {makeExecutableSchema, gql} from 'apollo-server-koa';
import {createUser, getUserByName} from './service';

const typeDefs = gql`
  type User {
    name: String!
    nikeName: String!
  }
  type Query {
    user(name: String!): User
  }
  type Mutation {
    addUser(name: String!, password: String!, nikeName: String!): User
  }
`;

const resolvers = {
  Query: {
    user: (parent: object, args: {name: string}) => getUserByName(args.name)
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
