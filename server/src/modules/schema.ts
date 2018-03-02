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
        const map = {
          1: {
            id: 1,
            name: '111',
            age: 123,
            sex: 'male'
          },
          2: {
            id: 2,
            name: '222',
            age: 123,
            sex: 'male'
          }
        };
        return map[args.id];
      }
    }
  }
});

export default new GraphQLSchema({
  query: Query
});
