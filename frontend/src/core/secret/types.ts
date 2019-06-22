import {SortOrder} from '~/enums';

export enum SecretSortableProps {
  SITE_NAME = 'siteName',
  URL = 'url',
  USER_NAME = 'userName',
  DECRYPT_PASSWORD = 'decryptPassword',
  NOTE = 'note',
  EMPTY = 'empty',
}

export interface SecretCfg {
  userId: string,
  [SecretSortableProps.SITE_NAME]: string,
  [SecretSortableProps.URL]?: string,
  [SecretSortableProps.USER_NAME]: string,
  [SecretSortableProps.DECRYPT_PASSWORD]: string,
  [SecretSortableProps.NOTE]?: string,
}

export interface Secret extends SecretCfg {
  _id: string,
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
  readonly order: SortOrder,
  readonly target: SecretSortableProps
}
