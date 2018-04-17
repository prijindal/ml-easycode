import createSagaMiddleware from 'redux-saga'
import { getSaga } from '../models/state';
import templates from './templates';

const sagaMiddleware = createSagaMiddleware()

export const registerSagas = () => {
  sagaMiddleware.run(getSaga(templates));
}

export default sagaMiddleware;
