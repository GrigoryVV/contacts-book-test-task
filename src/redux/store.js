import { combineReducers, createStore } from "redux";
import contactsReducer from "./contactsReducer"

const reducers = combineReducers({
    contacts: contactsReducer,
});

const store = createStore(reducers);


export default store;