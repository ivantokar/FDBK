const contact = (state = {}, action) => {
    switch (action.type) {
        case 'MESSAGE_SENT': return { state, data: action.payload };
        case 'MESSAGE_NOT_SENT': return { state, data: action.payload };
        default: return state;
    }
};

export default contact;