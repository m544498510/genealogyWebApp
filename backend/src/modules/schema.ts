import {mergeSchemas} from 'apollo-server-koa';

import userSchema from './user/schema';
import secretSchema from './secret/schema';

export default mergeSchemas({
  schemas: [userSchema, secretSchema],
})
