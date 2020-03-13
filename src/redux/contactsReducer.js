
const APP_INITIALIZATION = 'APP_INITIALIZATION';

const initialState = {
    isInit: false,
    contacts: [],
}

function contactsReducer(state = initialState, action) {
    switch (action.type) {
        case APP_INITIALIZATION:
            return {
                ...state,
                isInit: true,
            }
        default: 
            return state;
    }
}

export default contactsReducer;