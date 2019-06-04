import {connect, connection} from "mongoose";
import {createUser, deleteUser, getUser, getUserByName, getUserList, updateUser} from './index';

describe('user dao unit test', () => {
  beforeAll(() => {
    return connect('mongodb://localhost/myZoneTestDB');
  });

  afterAll(() => {
    return connection.close();
  });

  const name = 'ut_name';
  const password = 'ut_password';
  const nikeName = 'ut_nikeName';
  let id: string;

  describe('function createUser ', () => {
    test("should create user success", async () => {
      const user = await createUser(name, password, nikeName);
      id = user._id;
      expect(user.name).toBe(name);
      expect(user.password).toBe(password);
    });
  });

  describe('function getUserById', () => {
    test('should get user by id', async () => {
      const user = await getUserByName(name);
      expect(user).not.toBeNull();
      if (user) {
        expect(user.password).toBe(password);
      }
    });
  });

  describe('function getUserList', () => {
    test('should return all user list', async () => {
      const list = await getUserList();
      expect(list.length).toBe(1);
    })
  });

  describe('function getUser', () => {
    test("should get user success", async () => {
      const user = await getUser(name, password);
      expect(user).not.toBeNull();
      if (user) {
        expect(user._id).toEqual(id);
      }
    });
  });

  describe('function getUserByName', () => {
    test("should get user by name", async () => {
      const user = await  getUserByName(name);
      expect(user).not.toBeNull();
      if (user) {
        expect(user._id).toEqual(id);
      }
    });
  });

  describe('function updateUser', () => {
    test('should update the user password by special', async () => {
      const user = await updateUser(id, 'new_password');
      expect(user).not.toBeNull();
      if (user) {
        expect(user.password).toBe('new_password');
      }
    });
  });

  describe('function deleteUser', () => {
    test('should delete user by name', async () => {
      const result = await deleteUser(name);
      const user = await getUserByName(name);
      expect(result).toBeTruthy();
      expect(user).toBeNull();
    })
  })
});


