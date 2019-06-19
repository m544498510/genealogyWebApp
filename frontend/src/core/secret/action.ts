import {Secret} from "~/core/secret/types";
import {Dispatch} from "redux";
import {querySecrets} from "~/core/secret/dataProvider";

export enum TYPES {
  SET_SECRETS = 'setSecrets',

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
