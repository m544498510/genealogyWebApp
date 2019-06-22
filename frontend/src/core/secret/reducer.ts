import {TYPES} from './action';
import {SecretSortableProps, SecretState} from "./types";
import {SortOrder} from "~/enums";
import {Action} from '~/typeDeclare';

const defaultState: SecretState = {
  secretIds: [],
  secretMap: new Map(),

  pageNum: 1,
  pageSize: 15,

  sortInfo: {
    target: SecretSortableProps.EMPTY,
    order: SortOrder.false,
  },

  keyword: '',
};

export default function (state = defaultState, {type, payload}: Action<TYPES>) {
  switch (type) {
    case TYPES.SET_SECRETS:
      return Object.assign({}, state, {
        secretIds: payload.secretIds,
        secretMap: payload.secretMap
      });
    case TYPES.SET_KEY_WORD:
      return Object.assign({}, state, {
        keyword: payload
      });
    case TYPES.SET_PAGE_NUM:
      return Object.assign({}, state, {
        pageNum: payload
      });
    case TYPES.SET_PAGE_SIZE:
      return Object.assign({}, state, {
        pageSize: payload
      });
    case TYPES.SET_SORT_INFO:
      return Object.assign({}, state, {
        sortInfo: payload
      });
    default:
      return state;
  }
}
