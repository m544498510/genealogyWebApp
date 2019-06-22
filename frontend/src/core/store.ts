import {applyMiddleware, compose, createStore} from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import {CustomWindow} from '~/typeDeclare';

declare var window: CustomWindow;

let middleware = applyMiddleware(reduxThunk);
if (typeof window.devToolsExtension === 'function') {
  middleware = compose(middleware, window.devToolsExtension());
}

export default createStore(reducers, {}, middleware);
