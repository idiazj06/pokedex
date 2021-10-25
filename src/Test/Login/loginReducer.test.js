import  loginReducer  from '../../Reducers/loginReducer'
import { types } from '../../Types/types'



describe('Pruebas en authReducer', () => {

    test('Retornar el estado inicial del reducer', () => {
        const state = loginReducer({ logged: false }, {})

        expect(state).toEqual({ logged: false })
    })

    test('Autenticar y mostrar el nombre del usuario', () => {
        const action = {
            type: types.login,
            payload: {
                id: 'action.payload.id',
                name: 'action.payload.displayName'
            }
        }

        const state = loginReducer({}, action)

        expect(loginReducer({}, action)
        ).toEqual({
            id: 1234,
            id: 'action.payload.id',
            name: 'action.payload.displayName'
        })
    })

    test('Debe borrar el nombre de usuario y logged en false', () => {

        const action = {
            type: types.logout
        }

        const state = loginReducer({}, action);
        expect(state).toEqual({
        });
    })
})
