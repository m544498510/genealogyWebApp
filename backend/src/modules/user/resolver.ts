import {graphSchema as userSchema} from './types';
import {GraphQLList, GraphQLString} from "graphql";
import {getUser, getUserList, createUser} from './dao';

const query = {
  user: {
    name: 'user',
    type: userSchema,
    describe: 'get user by name and password',
    args: {
      name: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      }
    },
    resolve: async (_: any, args: any) => {
      return await getUser(args.name, args.password);
    }
  },
  userList: {
    name: 'user list',
    type: new GraphQLList(userSchema),
    describe: 'get user list',
    resolve: async () => {
      return await getUserList();
    }
  }
};

const mutation = {
  addUser: {
    name: 'addUser',
    type: userSchema,
    args: {
      name: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      }
    },
    resolve: async (_: any, args: any) => {
      console.log('add user', JSON.stringify(args));
      return await createUser(args.name, args.password);
    }
  }
};

export default {
  query,
  mutation
}
