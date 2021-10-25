import { typesPoke } from "../Types/types";

const initialState = {
    pokedex : []
}

export const pokedexReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesPoke.get:
            return {
                pokedex: action.payload
            }
    
        default:
            return state;
    }
}
export const detailReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesPoke.getDetail:
            return {
                pokemonDetail: action.payload
            }
    
        default:
            return state;
    }
}
export const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesPoke.getFavorites:
            return {
                favorites: action.payload
            }
    
        default:
            return state;
    }
}