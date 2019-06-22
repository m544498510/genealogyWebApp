import {combineReducers} from 'redux';
import {
  SecretState,
  stateName as secretStateName,
  reducer as secretReducer
} from './secret';

export interface RootState {
  [secretStateName]: SecretState
}

export default combineReducers({
  [secretStateName]: secretReducer
});

