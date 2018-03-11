import {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString} from 'graphql';
import userResolver from './user/resolver';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...userResolver.query,
  }
});

/*
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser:{
      type: User,
      args: {
        name: GraphQLString
      },
      resolve: (_, args) => {
        console.log('mutation');
      }
    }
  }
});
*/

export default new GraphQLSchema({
  query: Query,
  //mutation: Mutation
});
