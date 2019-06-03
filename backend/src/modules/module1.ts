import {makeExecutableSchema, gql} from 'apollo-server-koa';
export default makeExecutableSchema({
  typeDefs: gql`
    type User {
      name: String
    }
    type Query {
      User: User
    }
  `,
  resolvers: {
    Query: {
      User: () => ({ name: 'Hello world!'})
    },
  }
});
