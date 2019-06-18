import {ajaxDel, ajaxPost} from "~/utils/ajaxUtil";
import {ErrorMsgObject} from "~/utils/ajaxUtil/models";
import {User} from "~/core/user/model";
import {baseApiPath} from '~/config';
import {mutation, query} from "~/utils/graphqlUtil";
import {ADD_USER, QUERY_CURRENT_USER} from "~/core/user/dataProvider/graphql";

export function login(name: string, password: string): Promise<User | ErrorMsgObject> {
  return ajaxPost(`${baseApiPath}/user/session`, {
    name,
    password
  });
}

export function logout(): Promise<boolean | ErrorMsgObject> {
  return ajaxDel<boolean>(`${baseApiPath}/user/session`);
}

export function getCurrentUser(): Promise<User | ErrorMsgObject> {
  return query<User>(QUERY_CURRENT_USER, 'getCurrentUser');
}

export function addUser(userName: string, password: string, nikeName: string): Promise<User | ErrorMsgObject> {
  return mutation<User>(ADD_USER, 'addUser', {
    userName,
    password,
    nikeName
  });
}
