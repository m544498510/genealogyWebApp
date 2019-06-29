import {ajaxDel, ajaxPost} from "~/utils/ajaxUtil";
import {User} from "~/core/user/types";
import {baseApiPath} from '~/config';
import {mutation, query} from "~/utils/graphqlUtil";
import {ADD_USER, QUERY_CURRENT_USER} from "~/core/user/dataProvider/graphql";

export function login(name: string, password: string): Promise<User> {
  return ajaxPost(`${baseApiPath}/session`, {
    name,
    password
  }, true);
}

export function logout(): Promise<boolean> {
  return ajaxDel<boolean>(`${baseApiPath}/session`);
}

export function getCurrentUser(): Promise<User> {
  return query<User>(QUERY_CURRENT_USER, 'getCurrentUser');
}

export function addUser(userName: string, password: string, nikeName: string): Promise<User> {
  return mutation<User>(ADD_USER, 'addUser', {
    userName,
    password,
    nikeName
  });
}
