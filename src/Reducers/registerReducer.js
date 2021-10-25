import { types } from "../Types/types"

export const registerReducer = (state = {}, action) => {
    switch (action.type) {
        case types.register:

            return {
                uid: action.payload.email,
                displayName: action.payload.displayName,
                telefono: action.payload.phoneNumber,
                foto: null,
                password: action.payload.password

            }

            return {
        
            }
            

        default:
            return state;
    }
}
