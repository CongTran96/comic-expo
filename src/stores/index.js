import { applyMiddleware ,createStore } from 'redux';
import allReducers from '../reducers';

export default createStore(allReducers );