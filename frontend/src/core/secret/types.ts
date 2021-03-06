import {SortOrder} from 'antd/lib/table/interface';

export enum SecretSortableProps {
  SITE_NAME = 'siteName',
  URL = 'url',
  USER_NAME = 'userName',
  DECRYPT_PASSWORD = 'decryptPassword',
  NOTE = 'note',
  EMPTY = 'empty',
  PHONE = 'phone',
}

export interface SecretCfg {
  userId: string,
  [SecretSortableProps.SITE_NAME]: string,
  [SecretSortableProps.URL]?: string,
  [SecretSortableProps.USER_NAME]: string,
  [SecretSortableProps.DECRYPT_PASSWORD]: string,
  [SecretSortableProps.NOTE]?: string,
  [SecretSortableProps.PHONE]?: number
}

export interface Secret extends SecretCfg {
  _id: string,

  //hack for sort function
  [propName: string]: any;
}

export type SecretState = {
  readonly secretIds: string[],
  readonly secretMap: Map<string, Secret>

  readonly pageNum: number,
  readonly pageSize: number,

  readonly sortInfo: SortInfo,

  readonly keyword: string,
}

export interface SortInfo {
  readonly order: SortOrder | false,
  readonly target: SecretSortableProps | string
}
