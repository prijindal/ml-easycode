import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import { initFirebase } from '../helpers/firebase';
import reducer from './reducers';
import sagaMiddleware, { registerSagas } from './sagas';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['templates']
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default () => {
  initFirebase();
  const middleware = applyMiddleware(
    ...[
      logger,
      sagaMiddleware,
    ]
  );
  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store);
  registerSagas();
  return { store, persistor };
}
