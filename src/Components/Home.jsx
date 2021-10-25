import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../Actions/actionLogin'
import { useData } from '../Hooks/useData'
import Typography from '@mui/material/Typography';
import { Grid, Container, Modal } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';
import { getDetail } from '../Actions/actionPokemones';
import { Link } from 'react-router-dom';






export const Home = () => {
    let history = useHistory();
    const dispatch = useDispatch()
    const poke = useSelector(state => state.pokedex)
    const { pokedex } = poke


    const [fetchData, setOffset] = useData()

    useEffect(() => {
        fetchData()
    }, [])

    const handlePagination = (e, value) => {
        setOffset((value - 1) * 25)
    }


    const handlePokemonDetail = (data) => {
        console.log(data)
        dispatch(getDetail(data))
    }






    return (

        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
            <Grid container spacing={2} align="center" justify="center">
                {
                    pokedex &&
                    pokedex.map((data, index) => (
                        <Grid item xs={12} sm={6} lg={4} >
                            <Link 
                            to={`/detail`}
                            style={{listStyle:'none',textDecoration: 'none',color:'inherit'}}
                            >
                                <Box className="card" onClick={() => { handlePokemonDetail(data) }}>
                                    <Box className="card_header" sx={data.color === 'white' ? { backgroundColor: 'gray' } : { backgroundColor: data.color }}></Box>
                                    <Box className="card_img">
                                        <img src={
                                            data.imagenes.other.dream_world.front_default != null ?
                                                data.imagenes.other.dream_world.front_default :
                                                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
                                        } alt="imagen header card" className="card_body_img" />
                                    </Box>
                                    <Typography variant="h4">{data.nombre.toUpperCase()}</Typography>
                                    <Box className="card_footer">
                                        <Box className="tipos">
                                            <Typography variant="body1">Tipos</Typography>
                                            <Box className="data_tipos">
                                                {
                                                    data.tipos.map((item, index) => (
                                                        <Typography
                                                            variant="body2">{item.type.name.toUpperCase()}</Typography>
                                                    ))
                                                }
                                            </Box>
                                        </Box>
                                        <Box className="tipos">
                                            <Typography variant="body1">Evoluciones</Typography>
                                            <Box className="data_tipos">
                                                {
                                                    data.evolucion.species.name !== data.nombre ?
                                                        data.evolucion.evolves_to[0].species.name === data.nombre ?
                                                            data.evolucion.evolves_to[0] === undefined ?
                                                                'true' :
                                                                data.evolucion.evolves_to[0].evolves_to[0] === undefined ?
                                                                    'Sin evolucion' :
                                                                    <Typography variant="body2">{data.evolucion.evolves_to[0].evolves_to[0].species.name.toUpperCase()}</Typography>
                                                            : 'Sin evolucion'
                                                        : <Typography variant="body2">{data.evolucion.evolves_to[0].species.name.toUpperCase()}</Typography>
                                                }
                                            </Box>
                                        </Box>
                                        <Box className="tipos">
                                            <Typography variant="body1">Forma</Typography>
                                            <Box className="data_tipos">
                                                {
                                                    <Typography
                                                        variant="body2">{data.forma.toUpperCase()}</Typography>
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Link>
                        </Grid>
                    ))
                }
            </Grid>
            <Stack spacing={4} sx={{ mt: 3, mb: 2 }}>
                <Pagination fullWidth count={750 / 25} variant="outlined" color="secondary" onChange={handlePagination} />
            </Stack>
        </Container >
    )
}
