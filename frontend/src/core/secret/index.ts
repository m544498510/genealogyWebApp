import * as actions from './action';
import * as selectors from './selector';
export * from './types';
import reducer from './reducer';

export const stateName = "secret";

export {
  actions,
  selectors,
  reducer,
}
