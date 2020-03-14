import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import contactsReducer from "./contactsReducer";

const reducers = combineReducers({
    contacts: contactsReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));


export default store;