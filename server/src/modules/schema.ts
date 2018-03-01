import {GraphQLEnumType, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User object',
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    sex: {
      type: GraphQLString
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: User,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (_, args) => {
        return {}
      }
    }
  }
});

export default new GraphQLSchema({
  query: Query
});
