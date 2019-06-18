import axios, {AxiosError, AxiosResponse} from 'axios';
import {ErrorResponseData, ErrorMsgObject, HttpCodeMsgMap, BaseFailureHandle} from './models';

let _baseFailureHandel: BaseFailureHandle;

export function setProps(baseFailHandel: BaseFailureHandle) {
  _baseFailureHandel = baseFailHandel;
}

export function ajaxGet<T>(url: string, param?: object): Promise<T | ErrorMsgObject> {
  return axios.get(url, {params: param})
    .catch(errorHandle)
    .then((res: AxiosResponse) => successHandle<T>(res));
}

export function ajaxPost<T>(url: string, param?: object): Promise<T | ErrorMsgObject> {
  return axios.post(url, param)
    .catch(errorHandle)
    .then((res: AxiosResponse) => successHandle<T>(res));
}

export function ajaxPut<T>(url: string, param?: object): Promise<T | ErrorMsgObject> {
  return axios.put(url, param)
    .catch(errorHandle)
    .then((res: AxiosResponse) => successHandle<T>(res));
}

export function ajaxDel<T>(url: string, param?: object): Promise<T | ErrorMsgObject> {
  return axios.delete(url, {
    params: param,
  })
    .catch(errorHandle)
    .then((res: AxiosResponse) => successHandle<T>(res));
}

// content must be JSON or JSONText
export function getCheckMsg(httpCode: number, {code, msg}: ErrorResponseData): ErrorMsgObject {
  return {
    httpCode,
    code,
    title: getMsgByHttpCode(httpCode) || '',
    msg: msg || '',
  };
}

function getMsgByHttpCode(httpCode: number): string {
  return httpCodeMsgMap[httpCode] || '';
}

export function successHandle<T>(response: AxiosResponse): T {
    return response.data;
}

export function errorHandle({response}: AxiosError): Promise<ErrorMsgObject> {
  const msgObj = getCheckMsg(response.status, response.data);
  msgObj.response = response;

  if (_baseFailureHandel) {
    _baseFailureHandel(response);
  }
  return Promise.reject(msgObj);
}

const httpCodeMsgMap: HttpCodeMsgMap = {
  200: 'Success',
  205: 'Processing',

  404: 'Service Not Found',
  422: 'Unprocessable Entity',

  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended',
};
