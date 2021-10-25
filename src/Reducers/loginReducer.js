import { types } from '../Types/types'


const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...action.payload
            }

        case types.logout:
            return {

            }

        default:
            return state
    }
}

export default loginReducer