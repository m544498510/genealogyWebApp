import {Secret, SortInfo} from "~/core/secret/types";
import {Dispatch} from "redux";
import {querySecrets} from "~/core/secret/dataProvider";
import {Action} from "~/typeDeclare";

export enum TYPES {
  SET_SECRETS = 'setSecrets',
  SET_PAGE_NUM = 'setPageNum',
  SET_PAGE_SIZE = 'setPageSize',
  SET_SORT_INFO = 'setSortInfo',
  SET_KEY_WORD = 'setKeyword',
}

function setSecrets(ids: string[], map: Map<string, Secret>) {
  return {
    type: TYPES.SET_SECRETS,
    payload: {
      secretIds: ids,
      secretMap: map,
    }
  }
}

export function fetchSecrets() {
  return (dispatch: Dispatch) => {
    return querySecrets()
      .then(secrets => {
        const map = new Map<string, Secret>();
        const ids = secrets.map(secret => {
          const id = secret._id;
          map.set(id, secret);
          return id;
        });
        dispatch(setSecrets(ids, map));
      });
  }
}

export function setKeyword(keyword: string): Action {
  return {
    type: TYPES.SET_KEY_WORD,
    payload: keyword
  }
}

export function setPageNum(num: number): Action {
  return {
    type: TYPES.SET_PAGE_NUM,
    payload: num
  }
}

export function setPageSize(size: number): Action {
  return {
    type: TYPES.SET_PAGE_SIZE,
    payload: size
  }
}

export function setSortInfo(sortInfo: SortInfo): Action {
  return {
    type: TYPES.SET_SORT_INFO,
    payload: sortInfo
  }
}
