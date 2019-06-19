import {TYPES} from './action';
import {SecretState} from "./types";
import {SortOrder} from "~/enums";
import {Action} from '~/typeDeclare';

const defaultState: SecretState = {
  secretIds: [],
  secretMap: new Map(),

  pageNum: 1,
  pageSize: 15,

  sortTarget: '',
  sortOrder: SortOrder.false,

  keyword: '',
};

export default function(state = defaultState, {type, payload}: Action<TYPES>) {
  switch (type) {
    case TYPES.SET_SECRETS:
      return Object.assign({}, state, {
        secretIds: payload.secretIds,
        secretMap: payload.secretMap
      });
    default:
      return state;
  }
}
