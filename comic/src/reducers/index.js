import { applyMiddleware ,combineReducers } from 'redux';
import comics from './modules/comics/reducer';

const allReducers = combineReducers({
    comics,
});

export default allReducers;

