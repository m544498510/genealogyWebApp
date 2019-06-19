import {SortOrder} from '~/enums';

export interface SecretCfg {
  userId: string,
  siteName: string,
  url?: string,
  userName: string,
  decryptPassword: string,
  note?: string,
}

export interface Secret extends SecretCfg{
  _id: string,
}

export type SecretState = {
  readonly secretIds: string[],
  readonly secretMap: Map<string, Secret>

  readonly pageNum: number,
  readonly pageSize: number,

  readonly sortTarget: string,
  readonly sortOrder: SortOrder,

  readonly keyword: string,
}
