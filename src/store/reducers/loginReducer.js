const initialState = {
    isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        default:
            return state;
    }
};

export default loginReducer;
