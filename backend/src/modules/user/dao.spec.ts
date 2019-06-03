import mongoose from "mongoose";
import {DB_CFG} from '../../config';
import {getUser, getUserById, createUser, updateUser, deleteUser, getUserList} from './dao';

describe('user dao unit test', () => {
  beforeAll(() => {
    return mongoose.connect(DB_CFG.url);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  const name = 'ut_name';
  const password = 'ut_password';
  let id;

  describe('function createUser ', () => {
    test("should create user success", async () => {
      const user = await createUser(name, password);
      id = user._id;
      expect(user.name).toBe(name);
      expect(user.password).toBe(password);
    });
  });

  describe('function getUserById', () => {
    test('should get user by id', async () => {
      const user = await getUserById(id);
      expect(user.name).toBe(name);
      expect(user.password).toBe(password);
    });
  });

  describe('function getUserList', () => {
    test('should return all user list', async ()=>{
      const list = await getUserList();
      expect(list.length).toBe(2);
    })
  });

  describe('function getUser', () => {
    test("should get user success", async () => {
      const user = await getUser(name, password);
      expect(user._id).toEqual(id);
    });
  });

  describe('function updateUser', () => {
    test('should update the user password by special', async () => {
      const user = await updateUser(id, 'new_password');
      expect(user.password).toBe('new_password');
    });
  });

  describe('function deleteUser', () => {
    test('should delete user by id', async () => {
      const result = await deleteUser(id);
      const user = await getUserById(id);
      expect(result).toBeTruthy();
      expect(user).toBeNull();

    })
  })
});


