import {ajaxPost} from '../ajaxUtil';
import {ErrorMsgObject} from "~/utils/ajaxUtil/models";

let _apiPath = '/graphql';

export function setApiPath(apiPath: string): void {
  _apiPath = apiPath;
}

export function query<T>(query: string, operationName?: string, variables?: object,): Promise<T | ErrorMsgObject> {
  return ajaxPost<T>(_apiPath, {
    operationName,
    variables,
    query
  })
    .then();
}

export function mutation<T>(mutation: string, operationName: string, variables: object): Promise<T | ErrorMsgObject> {
  return ajaxPost<T>(_apiPath, {
    operationName,
    variables,
    mutation
  })
}
