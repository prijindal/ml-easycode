import createSagaMiddleware from 'redux-saga'
import { print } from 'util';

const sagaMiddleware = createSagaMiddleware()

export const registerSagas = () => {
  print("Running sagas");
}

export default sagaMiddleware;
