import {mergeSchemas, makeExecutableSchema, gql} from 'apollo-server-koa';

import moduleSchema from './module1';

const schema2 = makeExecutableSchema({
  typeDefs: gql`
    type Starship {
      id: String!
      name: String!
    }
    type Query {
      Starship: Starship
    }
  `,
  resolvers: {
    Query: {
      Starship: () => ({id:1, name: 'em....'})
    }
  }
});

export default mergeSchemas({
  schemas: [moduleSchema, schema2],
})
