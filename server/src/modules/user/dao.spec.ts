import * as mongoose from "mongoose";
import {DB_CFG} from '../../config';
import {getUser, createUser, updateUser, deleteUser} from './dao';

describe('user dao unit test', ()=>{
  beforeAll(() => {
    return mongoose.connect(DB_CFG.url);
  });

  afterAll(()=>{
    return mongoose.connection.close();
  });

  const name = 'ut_name';
  const password = 'ut_password';
  let id;

  describe('function createUser ', ()=>{
    test("should create user success",()=>{
      return createUser(name, password)
        .then((user)=>{
          id = user._id;
          expect(user.name).toBe(name);
          expect(user.password).toBe(password);
        });
    });
  });

  describe('function getUser', ()=>{
    test("should get user success", ()=>{
      return getUser(name, password)
        .then(user => {
          expect(user._id).toEqual(id);
        });
    });
  });

  describe('function updateUser', ()=>{
    test('should update the user password by special', ()=>{
      return updateUser(id,'new_password')
        .then(user=>{
          expect(user.password).toBe('new_password');
        })
    });
  });

  describe('function deleteUser', ()=>{
    test('should delete user by id', ()=>{
      return deleteUser(id)
        .then(user=>{
          expect(user._id).toEqual(id);
        })
    })
  })
});


