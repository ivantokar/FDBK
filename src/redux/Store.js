import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import contact from './reducers/contact';

export default createStore(
    combineReducers({
		routing: routerReducer,
        contact,
    }), applyMiddleware(thunk)
);