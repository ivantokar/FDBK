import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer } from 'react-router-redux';
import contact from './reducers/contact';


export default createStore(
    combineReducers({
		routing: routerReducer,
        contact,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);