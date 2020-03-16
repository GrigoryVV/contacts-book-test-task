import { sortContactsByName } from "./helpers";

const APP_INITIALIZATION = 'APP_INITIALIZATION';
const SET_CONTACTS = 'SET_CONTACTS';
const SET_CONTACT_TO_EDIT = 'SET_CONTACT_TO_EDIT';
const REMOVE_CONTACT_TO_EDIT = 'REMOVE_CONTACT_TO_EDIT';
const EDIT_MAIN_CONTACT_PROP = 'EDIT_MAIN_CONTACT_PROP';
const EDIT_ADDRESS_CONTACT_PROP = 'EDIT_ADDRESS_CONTACT_PROP';
const SAVE_CHANGED_CONTACT = 'SAVE_CHANGED_CONTACT';
const SET_SEARCH = 'SET_SEARCH';

const initialState = {
    isInit: false,
    contacts: [],
    contactToEdit: null,
    contactToEditId: null,
    search: '',
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
            localStorage.setItem("contacts", JSON.stringify(action.contacts));
            return {
                ...state,
                contacts: action.contacts
            };
        case SET_CONTACT_TO_EDIT:
            return {
                ...state,
                contactToEditId: action.contact.id,
                contactToEdit: {
                    ...action.contact,
                    address: {
                        ...action.contact.address
                    }
                }
            }
        case REMOVE_CONTACT_TO_EDIT:
            return {
                ...state,
                contactToEditId: null,
                contactToEdit: null
            }
        case EDIT_MAIN_CONTACT_PROP:
            return {
                ...state,
                contactToEdit: {
                    ...state.contactToEdit,
                    [action.property]: action.value
                }
            }
        case EDIT_ADDRESS_CONTACT_PROP:
            return {
                ...state,
                contactToEdit: {
                    ...state.contactToEdit,
                    address: {
                        ...state.contactToEdit.address,
                        [action.property]: action.value
                    }
                }
            }
        case SAVE_CHANGED_CONTACT:
            const contactsWithChanged = state.contacts.map(contact => {
                if (contact.id === state.contactToEditId) {
                    return state.contactToEdit;
                } else {
                    return contact;
                }
            });
            localStorage.setItem("contacts", JSON.stringify(contactsWithChanged));
            return {
                ...state,
                contacts: contactsWithChanged
            }
        case SET_SEARCH:
            return {
                ...state,
                search: action.value
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
export const removeContactToEdit = () => {
    return {
        type: REMOVE_CONTACT_TO_EDIT,
    };
}
// action creator for changing properties 'name', 'phone', 'email'
export const editMainContactProp = (value, property) => {
    return {
        type: EDIT_MAIN_CONTACT_PROP,
        value,
        property
    }
}
// action creator for changing properties inside the address property
export const editAddressContactProp = (value, property) => {
    return {
        type: EDIT_ADDRESS_CONTACT_PROP,
        value,
        property
    }
}
export const saveChangedContact = () => {
    return {
        type: SAVE_CHANGED_CONTACT,
    }
}
export const setSearch = (value) => {
    return {
        type: SET_SEARCH,
        value,
    }
}


// thunk creator
export const initializeApp = () => async (dispatch) => {
    if (localStorage.getItem('isInit') === null) {
        const response = await fetch('http://demo.sibers.com/users');
        if (response.ok) {
            const data = await response.json();
            dispatch(setContacts(data.sort(sortContactsByName)));
            dispatch(initSucceed());
        } else {
            alert('Initialization fail, http error: ' + response.status)
        }
    } else if (localStorage.getItem('contacts') !== null) {
        const localContacts = JSON.parse(localStorage.getItem('contacts'));
        dispatch(setContacts(localContacts));
        dispatch(initSucceed());
    } else {
        console.log('Please clear your local storage');
    }
}

export default contactsReducer;