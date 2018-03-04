import * as mongoose from "mongoose";
import {getUser, createUser, updateUser} from './dao';

mongoose.connect('mongodb://localhost/genealogy')
  .then(() => {
    console.log('connect the mongodb');
  });

test("asd",()=>{
  expect(1).toBe(1);
});


