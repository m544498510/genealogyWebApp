import {AxiosResponse} from "axios";

export interface ErrorResponseData {
  code: string,
  msg: string
}

export interface ErrorMsgObject<T = any> {
  httpCode: number,
  code: string,
  title: string,
  msg: string,
  response?: AxiosResponse<T>
}

export interface HttpCodeMsgMap {
  [key: number]: string
}

export interface BaseFailureHandle {
  (response: AxiosResponse, msgObj: ErrorMsgObject): void
}
