import * as axios from 'axios';

const APP_INITIALIZATION = 'APP_INITIALIZATION';
const SET_CONTACTS = 'SET_CONTACTS';
const SET_CONTACT_TO_EDIT = 'SET_CONTACT_TO_EDIT';

const initialState = {
    isInit: false,
    contacts: [],
    contactToEdit: null,
}

function contactsReducer(state = initialState, action) {
    switch (action.type) {
        case APP_INITIALIZATION:
            localStorage.setItem("isInit", "true")
            return {
                ...state,
                isInit: true,
            };
        case SET_CONTACTS:
            localStorage.setItem("contacts", JSON.stringify(action.contacts)); // think of
            return {
                ...state,
                contacts: action.contacts
            };
        case SET_CONTACT_TO_EDIT:
            return {
                ...state,
                contactToEdit: action.contact
            }
        default: 
            return state;
    }
}

// action creators
const initSucceed = () => {
    return { type: APP_INITIALIZATION };
}
const setContacts = (contacts) => {
    return {
        type: SET_CONTACTS,
        contacts
    };
}
export const setContactToEdit = (contact) => {
    return {
        type: SET_CONTACT_TO_EDIT,
        contact
    };
}


// thunk creators
export const initializeApp = () => async (dispatch) => {
    if (localStorage.getItem('isInit') === null) {
        const data = await axios.get('http://demo.sibers.com/users')
            .then(response => response.data);
        dispatch(setContacts(data));
        dispatch(initSucceed());
    } else if (localStorage.getItem('contacts') !== null) {
        const localContacts = JSON.parse(localStorage.getItem('contacts'));
        dispatch(setContacts(localContacts));
        dispatch(initSucceed());
    } else {
        console.log('Please clear your local storage');
    }
}

export default contactsReducer;