import React from 'react'
import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useSelector } from 'react-redux';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDispatch } from 'react-redux';
import { Badge, IconButton } from '@mui/material';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { logout, startLogout } from '../Actions/actionLogin';

const theme = createTheme({
    palette: {
        primary: {
            light: '#2bc8c8',
            main: '#299ac1',
            dark: '#1a627d',
            contrastText: '#fff',
        },
    },
});

export default function InterfazUsuario(props) {
    const perfil = useSelector(state => state.login)
    const favoritos = useSelector(state => state.favoritos)
    const { favorites } = favoritos
    const dispatch = useDispatch()

    const handleCerrarSesion = () => {
        dispatch(startLogout());
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />

                    <Box
                        sx={{
                            marginTop: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography
                            component="h2"
                            variant="h5"
                            sx={{
                                mb: 4
                            }}>
                            Perfil
                        </Typography>


                        {perfil.foto ?
                            <Avatar alt={perfil.displayName} src={`${perfil.foto}`}
                                sx={{ width: 80, height: 80 }} />
                            :
                            <div>
                                <input
                                    id="fileSelector"
                                    type="file"
                                    name="file"
                                    style={{ display: 'none' }}
                                // onChange={handleFileChanged}
                                />
                                <IconButton aria-label="actualizaFoto">
                                    <AddPhotoAlternateIcon
                                        // onClick={handleActualizafoto}
                                        sx={{
                                            fontSize: "60px",
                                            color: "#131921"
                                        }} />
                                </IconButton>
                            </div>
                        }

                        <Box sx={{
                            mt: 1,

                        }}>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography
                                        align='center'
                                        component="h2"
                                        variant="h6">
                                        {`${perfil.displayName}`}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography
                                        align='center'
                                        component="h2"
                                        variant="subtitle1">
                                        {`${perfil.email}`}
                                    </Typography>
                                </Grid>





                            </Grid>
                            <Grid container justifyContent="center">
                                {
                                    favorites ?
                                        <Link
                                            onClick={() => props.setShowInterfaz(false)}
                                            to="/favoritos"
                                            style={{ textDecoration: 'none', color: 'grey' }}
                                        >
                                            <Button
                                                size="small"
                                                type="submit"
                                                variant="outlined"
                                                sx={{
                                                    mt: 3,
                                                    color: '#7E8284'
                                                }}
                                                startIcon={<FavoriteIcon />}
                                            >
                                                Mis favoritos
                                                <Badge badgeContent={favorites.length}
                                                    color="success"
                                                ></Badge>

                                            </Button>
                                        </Link>
                                        :
                                        <Link
                                            onClick={() => props.setShowInterfaz(false)}
                                            to="/favoritos"
                                            style={{ textDecoration: 'none', color: 'grey' }}
                                        >
                                            <Button
                                                size="small"
                                                type="submit"
                                                variant="outlined"
                                                sx={{
                                                    mt: 3,
                                                    color: '#7E8284'
                                                }}
                                                startIcon={<FavoriteIcon />}
                                            >
                                                Mis favoritos
                                                <Badge
                                                    badgeContent={0}
                                                    color="error"
                                                >

                                                </Badge>

                                            </Button>
                                        </Link>
                                }

                            </Grid>

                            <Grid container justifyContent="center">

                                <Button
                                    onClick={handleCerrarSesion}
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2
                                    }}
                                    endIcon={<LoginIcon />}
                                >
                                    <Link
                                        to="/"
                                        style={{ textDecoration: 'none', color: 'white' }}
                                    >
                                        cerrar sesion
                                    </Link>
                                </Button>


                            </Grid>



                        </Box>
                    </Box>

                </Container >
            </ThemeProvider >
        </>
    )
}
