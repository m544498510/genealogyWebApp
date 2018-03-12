import {graphSchema} from './types';
import {GraphQLList, GraphQLString} from "graphql";
import {getUser, getUserList} from './dao';
const query = {
  user: {
    name: 'user',
    type: graphSchema,
    describe: 'get user by name and password',
    args: {
      name: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      }
    },
    resolve: async (_, args:object) => {
      return await getUser(args.name, args.password);
    }
  },
  userList: {
    name: 'user list',
    type: new GraphQLList(graphSchema),
    describe: 'get user list',
    resolve: async ()=>{
      return await getUserList();
    }
  }
};

export default {
  query
}
