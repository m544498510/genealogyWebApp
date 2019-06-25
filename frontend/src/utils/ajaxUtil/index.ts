import axios, {AxiosError, AxiosResponse} from 'axios';
import {ErrorResponseData, ErrorMsgObject, HttpCodeMsgMap, BaseFailureHandle} from './types';

let _baseFailureHandel: BaseFailureHandle;

export function setProps(baseFailHandel: BaseFailureHandle) {
  _baseFailureHandel = baseFailHandel;
}

export function ajaxGet<T>(url: string, params?: object, withoutBaseHandle?: boolean): Promise<T> {
  return axios.get(url, {params})
    .then((res: AxiosResponse) => successHandle<T>(res))
    .catch<never>((e: AxiosError) => errorHandle(e, withoutBaseHandle))
}

export function ajaxPost<T>(url: string, params?: object, withoutBaseHandle?: boolean): Promise<T> {
  return axios.post(url, params)
    .then((res: AxiosResponse) => successHandle<T>(res))
    .catch<never>((e: AxiosError) => errorHandle(e, withoutBaseHandle))
}

export function ajaxPut<T>(url: string, params?: object, withoutBaseHandle?: boolean): Promise<T> {
  return axios.put(url, params)
    .then((res: AxiosResponse) => successHandle<T>(res))
    .catch<never>((e: AxiosError) => errorHandle(e, withoutBaseHandle))

}

export function ajaxDel<T>(url: string, params?: object, withoutBaseHandle?: boolean): Promise<T> {
  return axios.delete(url, {params})
    .then((res: AxiosResponse) => successHandle<T>(res))
    .catch<never>((e: AxiosError) => errorHandle(e, withoutBaseHandle))
}

// content must be JSON or JSONText
export function getCheckMsg(httpCode: number, {code, message}: ErrorResponseData): ErrorMsgObject {
  return {
    httpCode,
    code,
    title: getMsgByHttpCode(httpCode) || 'Internal Error',
    msg: message || '',
  };
}

function getMsgByHttpCode(httpCode: number): string {
  return httpCodeMsgMap[httpCode] || '';
}

export function successHandle<T>(response: AxiosResponse): T {
  return response.data;
}

export function errorHandle({response}: AxiosError, withoutBaseFailureHandle: boolean): Promise<never> {
  const msgObj = getCheckMsg(response.status, response.data);
  msgObj.response = response;

  if (_baseFailureHandel && !withoutBaseFailureHandle) {
    _baseFailureHandel(response, msgObj);
  }
  return Promise.reject(msgObj);
}

const httpCodeMsgMap: HttpCodeMsgMap = {
  200: 'Success',
  205: 'Processing',

  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
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
