import {createSelector} from "reselect";
import {Secret, SecretSortableProps, SecretState, SortInfo, stateName} from './index';
import {RootState} from "~/core/reducers";
import {SortOrder} from "~/enums";

export function getModuleState(rootState: RootState): SecretState {
  return rootState[stateName];
}

export function getSecretIds(rootState: RootState): string[] {
  return getModuleState(rootState).secretIds;
}

export function getSecretMap(rootState: RootState): Map<string, Secret> {
  return getModuleState(rootState).secretMap;
}

export function getPageNum(rootState: RootState): number {
  return getModuleState(rootState).pageNum;
}

export function getPageSize(rootState: RootState): number {
  return getModuleState(rootState).pageSize;
}

export function getSortInfo(rootState: RootState): SortInfo {
  return getModuleState(rootState).sortInfo;
}

export function getKeyword(rootState: RootState): string {
  return getModuleState(rootState).keyword;
}

export const getDisplaySecrets = createSelector(
  getSecretIds,
  getSecretMap,
  getPageNum,
  getPageSize,
  getSortInfo,
  getKeyword,
  (ids, map, pageNum, pageSize, sortInfo, keyword): Secret[] => {
    let filterIds = ids;

    if (keyword !== '') {
      filterIds = filterIds.filter(id => {
        const secret = map.get(id);
        return (
          secret.siteName.includes(keyword)
          || secret.url.includes(keyword)
          || secret.userName.includes(keyword)
          || secret.note.includes(keyword)
        );
      })
    }

    let filterSecrets = filterIds.map(id => map.get(id));

    if (sortInfo.target !== SecretSortableProps.EMPTY) {
      const target = sortInfo.target;
      const order = sortInfo.order;
      filterSecrets = filterSecrets.sort((a, b) => {
        if (a[target] > b[target]) {
          return order === SortOrder.ascend ? -1 : 1;
        } else if (a[target] < b[target]) {
          return order === SortOrder.ascend ? 1 : -1;
        } else {
          return 0;
        }
      })
    }

    const startIndex = (pageNum - 1) * pageSize;
    filterSecrets.slice(startIndex, startIndex + pageSize);

    return filterSecrets;
  }
);


