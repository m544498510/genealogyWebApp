import {ajaxPost} from '../ajaxUtil';
import {ExecutionResult} from 'graphql';
import {ErrorMsgObject} from "~/utils/ajaxUtil/types";

let _apiPath = '/graphql';

export function setApiPath(apiPath: string): void {
  _apiPath = apiPath;
}

export function query<T>(query: string, operationName?: string, variables?: object,): Promise<T> {
  return ajaxPost<T>(_apiPath, {
    operationName,
    variables,
    query
  })
    .then((result: ExecutionResult<T>) => result.data)
    .catch(errorHandle)
}

export function mutation<T>(mutation: string, operationName: string, variables: object): Promise<T> {
  return ajaxPost<T>(_apiPath, {
    operationName,
    variables,
    query: mutation
  })
    .then((result: ExecutionResult<T>) => result.data)
    .catch(errorHandle)
}

function errorHandle(e: ErrorMsgObject<ExecutionResult>): Promise<never> {
  const errors = e.response.data.errors;
  e.msg = errors.reduce((msg, error) => `${error.message} \n`, '');
  return Promise.reject(e);
}
