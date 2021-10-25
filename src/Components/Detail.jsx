import { Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { putFavoriteAsync } from '../Actions/actionPokemones'



export const Detail = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.login)
    const detail = useSelector(state => state.detail)
    const { pokemonDetail } = detail
    const fecha = new Date()
    const [styleCard, setStyleCard] = useState({
        width: '70%',
        margin: 'auto auto 30px auto',
        borderRadius: '16px',
        overflow: 'hidden',
        padding: 2,
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        background: `linear-gradient(gray, #fff)`
    })

    useEffect(() => {
        if (!pokemonDetail) {
            console.log(true)
            history.replace('/')
            setStyleCard({
                width: '70%',
                margin: 'auto auto 30px auto',
                borderRadius: '16px',
                overflow: 'hidden',
                padding: 2,
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                background: `linear-gradient(gray, #fff)`
            })
        } else {
            setStyleCard({
                width: '70%',
                margin: 'auto auto 30px auto',
                borderRadius: '16px',
                overflow: 'hidden',
                padding: 2,
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                background: `linear-gradient(${pokemonDetail.color}, #fff)`
            })
        }

        console.log(detail)
    }, [])



    const handleFavoritos = () => {
        dispatch(putFavoriteAsync(pokemonDetail, fecha, user.id, user.displayName))
    }

    return (
        <div style={{ marginTop: 64 }}>

            {pokemonDetail && <div>
                <Box className="card_header" sx={pokemonDetail.color === 'white' ? { backgroundColor: 'gray' } : { backgroundColor: pokemonDetail.color }}></Box>
                <Grid container >
                    <Grid item xs={12} md={4}>
                        <Box className="card_img">
                            <img src={
                                pokemonDetail.imagenes.other.dream_world.front_default != null ?
                                    pokemonDetail.imagenes.other.dream_world.front_default :
                                    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetail.id}.png`
                            } alt="imagen header card" className="card_body_img" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8} align="start" sx={{ mt: 2 }}>
                        <Typography variant="h2">{pokemonDetail.nombre.toUpperCase()}</Typography>
                    </Grid>
                    <Box sx={styleCard}   >
                        <Grid container >
                            <Grid item xs={12} align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', p: 2 }}>
                                {
                                    pokemonDetail.imagenes.other.dream_world &&
                                    <img className="card_img_detail" src={pokemonDetail.imagenes.other.dream_world.front_default} alt="" />
                                }
                                {
                                    <img className="card_img_detail" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetail.id}.png`} alt="" />
                                }
                            </Grid>
                            <Grid item xs={6} align="center" sx={{ mt: 4 }}>
                                <Typography variant="h5">EVOLUCIÓN</Typography>

                                {
                                    pokemonDetail.evolucion.species.name !== pokemonDetail.nombre ?
                                        pokemonDetail.evolucion.evolves_to[0].species.name === pokemonDetail.nombre ?
                                            pokemonDetail.evolucion.evolves_to[0] === undefined ?
                                                '' :
                                                pokemonDetail.evolucion.evolves_to[0].evolves_to[0] === undefined ?
                                                    <Typography variant="body1" sx={{ mt: 2 }}>{'Sin evolución'}</Typography> :
                                                    <Typography sx={{ mt: 2 }} variant="body2">{pokemonDetail.evolucion.evolves_to[0].evolves_to[0].species.name.toUpperCase()}</Typography>
                                            : <Typography variant="body1" sx={{ mt: 2 }}>{'Sin evolución'}</Typography>
                                        : <Typography sx={{ mt: 2 }} variant="body2">{pokemonDetail.evolucion.evolves_to[0].species.name.toUpperCase()}</Typography>
                                }

                            </Grid>
                            <Grid item xs={6} align="center" sx={{ mt: 4, textAlign: 'center' }}>
                                <Typography variant="h5">TAMAÑO</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ pr: 2 }}>
                                        <Typography variant="h6">{'Altura'}</Typography>
                                        <Typography variant="body1">{pokemonDetail.altura}</Typography>
                                    </Box>
                                    <Box sx={{ pl: 2 }}>
                                        <Typography variant="h6">{'Peso'}</Typography>
                                        <Typography variant="body1">{pokemonDetail.peso}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <IconButton>
                                    <FavoriteTwoToneIcon sx={{ color: 'red' }} />
                                    <Typography variant="h5" onClick={handleFavoritos}>{'Agregar a favoritos'}</Typography>
                                </IconButton>
                            </Grid>

                        </Grid>
                    </Box>
                </Grid>
            </div>}
        </div>
    )
}
