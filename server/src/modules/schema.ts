import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import userResolver from './user/resolver';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...userResolver.query,
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...userResolver.mutation,
  })
});

export default (new GraphQLSchema({
  query: Query,
  mutation: Mutation
}));
