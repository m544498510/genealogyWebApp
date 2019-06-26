import {Secret, SecretCfg, SortInfo} from "~/core/secret/types";
import {Dispatch} from "redux";
import * as dp from "~/core/secret/dataProvider";
import {Action} from "~/typeDeclare";
import {ThunkAction} from "redux-thunk";
import {RootState} from "~/core/reducers";
import {getSecretMap} from "~/core/secret/selector";

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

export function fetchSecrets(): ThunkAction<Promise<Secret[]>, RootState, any, Action> {
  return (dispatch: Dispatch) => dp.querySecrets()
    .then(secrets => {
      const map = new Map<string, Secret>();
      const ids = secrets.map(secret => {
        const id = secret._id;
        map.set(id, secret);
        return id;
      });
      dispatch(setSecrets(ids, map));
      return secrets;
    });
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

export function createSecret(secretCfg: SecretCfg): ThunkAction<Promise<Secret>, RootState, any, any> {
  return (dispatch, getState) => dp.addSecret(secretCfg)
    .then(secret => {
      const orgSecretMap = getSecretMap(getState());
      const id = secret._id;
      orgSecretMap.set(id, secret);
      const secretMap = new Map(orgSecretMap);
      dispatch(setSecrets([...secretMap.keys()], secretMap));
      return secret;
    })
}

export function updateSecret(secret: Secret): ThunkAction<Promise<Secret>, RootState, any, any> {
  return (dispatch, getState) => dp.updateSecret(secret)
    .then(secret => {
      const orgSecretMap = getSecretMap(getState());
      orgSecretMap.set(secret._id, secret);
      const secretMap = new Map(orgSecretMap);
      dispatch(setSecrets([...secretMap.keys()], secretMap));
      return secret;
    })
}

export function delSecret(id: string): ThunkAction<Promise<void>, RootState, any, any> {
  return (dispatch, getState) => dp.delSecret(id)
    .then(() => {
      const orgSecretMap = getSecretMap(getState());
      orgSecretMap.delete(id);
      const secretMap = new Map(orgSecretMap);
      dispatch(setSecrets([...secretMap.keys()], secretMap));
    })
}
