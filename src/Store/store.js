import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import  loginReducer  from '../Reducers/loginReducer'
import  {registerReducer}  from '../Reducers/registerReducer'
import { pokedexReducer, detailReducer, favoritesReducer } from '../Reducers/pokedexReducer'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const reducers = combineReducers({
    login: loginReducer,
    pokedex:pokedexReducer,
    detail:detailReducer,
    favoritos:favoritesReducer,
    register:registerReducer   
})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)