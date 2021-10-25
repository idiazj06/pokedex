import { typesPoke } from "../Types/types";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";
import { db } from "../Firebase/firebaseConfig"

const URL = 'http://pokeapi.salestock.net/api/v2/'




export const getPokedex = (data) => {
    return {
        type: typesPoke.get,
        payload: data,
    }
}

export const getDetail = (data) => {
    return {
        type: typesPoke.getDetail,
        payload: data,
    }
}


export const putFavoriteAsync = (data, fecha, id, nombre) => {
    return async (dispatch) => {
        const newData = {
            data,
            fecha
        }
        addDoc(collection(db, `Data favoritos`, `${nombre}`, 'favoritos'), newData)
            .then(resp => {
                console.log(resp)
                console.log(newData)

            })
            .catch(err => {
                console.log(err)
            })
    }

}
export const getFavoriteAsync = (nombre) => {
    return async (dispatch) => {
        const coleccion = collection(db, `Data favoritos`, `${nombre}`, 'favoritos')
        const favorite = await getDocs(coleccion);
        const favoritos = [];
        favorite.forEach((document) => {
            favoritos.push({
                id: document.id,
                ...document.data()
            })
        })
        dispatch(getFavorite(favoritos))
    }
}



export const getFavorite = (favoritos) => {
    return {
        type: typesPoke.getFavorites,
        payload: favoritos
    }
}


export const delFavoriteAsync = (nombre,id) =>{

    console.log(id)
    return  async (dispatch,getState) => {
        const docRef = doc(db, `Data favoritos`, `${nombre}`, 'favoritos',`${id}`);
        await deleteDoc(docRef);
    } 
}
export const editFavoriteAsync = (nombre,id,data) =>{
    console.log(data)
    return  async (dispatch,getState) => {
        const docRef = doc(db, `Data favoritos`, `${nombre}`, 'favoritos',`${id}`,);
        await updateDoc(docRef,{
            data:{
                ...data,
                nombre:data.nombre
            }});
    } 
}


