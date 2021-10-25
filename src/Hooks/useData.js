import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { getEvolutions, getPokedex, getPokedexAsync, getPokemones } from '../Actions/actionPokemones';


export const useData = (initialState = {}) => {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [offset, setOffset] = useState(0)
    let baseURL = `https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0`;

    const fetchData = (url) => {
        axios.get(url)
            .then(resp => {
                for (let i = 0; i < resp.data.results.length; i++) {
                    axios.get(resp.data.results[i].url)
                        .then(result => {
                            axios.get(result.data.species.url)
                                .then(response => {
                                    axios.get(response.data.evolution_chain.url)
                                        .then(respuesta => {
                                            setData(prev => [...prev,
                                            {
                                                id: response.data.id,
                                                nombre: response.data.name,
                                                color: response.data.color.name,
                                                forma: response.data.shape.name,
                                                imagenes: result.data.sprites,
                                                tipos: result.data.types,
                                                peso: result.data.weight,
                                                altura: result.data.height,
                                                evolucion: respuesta.data.chain
                                            }
                                            ])
                                        })
                                        .catch(err => { console.log(err.message) })


                                })
                                .catch(err => {
                                    console.log(err.message)
                                })

                        })
                        .catch(err => {
                            console.log(err.message)
                        })

                }
            })
            .catch(err => console.log(err.message))

    }



    useEffect(() => {
        dispatch(getPokedex(data))
    }, [data])

    useEffect(() => {
        setData([])
    }, [dispatch])

    useEffect(() => {
        if (offset > 0) {
            setData([])
            baseURL = `https://pokeapi.co/api/v2/pokemon/?limit=25&offset=${offset}`
            fetchData(baseURL)
        } else {
            setData([])
            baseURL = `https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0`
            fetchData(baseURL)
        }
    }, [offset])

    return [fetchData, setOffset, offset]
}
