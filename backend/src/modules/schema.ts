import {mergeSchemas} from 'apollo-server-koa';

import userSchema from './user/schema';

export default mergeSchemas({
  schemas: [userSchema],
})
