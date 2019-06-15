import {AxiosResponse} from "axios";

export interface ErrorResponseData {
  code: string,
  msg: string
}

export interface ErrorMsgObject {
  httpCode: number,
  code: string,
  title: string,
  msg: string,
  response?: AxiosResponse
}

export interface HttpCodeMsgMap {
  [key: number]: string
}

export interface BaseFailureHandle {
  (response: AxiosResponse): void
}
