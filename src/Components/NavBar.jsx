import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useHistory, useLocation } from 'react-router'
import IconButton from '@mui/material/IconButton'
import { Avatar, Button, Popover } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'
import { OffCanvas } from './OffCanvas'


export const NavBar = () => {
    const dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()
    const user = useSelector(state => state.login)
    const detail = useSelector(state => state.detail)
    const { pokemonDetail } = detail
    const [showInterfaz, setShowInterfaz] = useState(false)


    useEffect(() => {
        if (!pokemonDetail) {
            history.replace('/')
        }
    }, [])


    return (
        <>
            {location.pathname === '/detail' ?
                <AppBar position="fixed" color="primary" sx={pokemonDetail ? { backgroundColor: pokemonDetail.color, color: 'black' } : { backgroundColor: 'white', color: 'black' }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flex: 1 }}>
                            POKEDEX
                        </Typography>
                        <Link to="/"><IconButton><HomeIcon sx={{ color: 'white' }} /></IconButton></Link>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            {user.foto ?
                                <IconButton onClick={() => setShowInterfaz(true)} ><Avatar sx={{ width: 30, height: 30 }} alt={user.displayName} src={`${user.foto}`} /></IconButton>
                                :
                                <IconButton onClick={() => setShowInterfaz(true)} sx={{ border: "dotted 2px yellow" }}><AccountCircleIcon sx={{ color: 'white' }} /></IconButton>
                            }
                        </IconButton>
                    </Toolbar>
                </AppBar>
                :

                <AppBar position="fixed" color="primary" sx={{ backgroundColor: 'white', color: 'black' }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flex: 1 }}>
                            POKEDEX
                        </Typography>
                        <Link to="/">
                            <IconButton>
                                <HomeIcon sx={{ color: 'gray' }} />
                                </IconButton></Link>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            {user.foto ?
                                <IconButton onClick={() => setShowInterfaz(true)} ><Avatar sx={{ width: 30, height: 30 }} alt={user.displayName} src={`${user.foto}`} /></IconButton>
                                :
                                <IconButton onClick={() => setShowInterfaz(true)} sx={{ border: "dotted 2px yellow" }}><AccountCircleIcon sx={{ color: 'white' }} /></IconButton>
                            }
                        </IconButton>
                    </Toolbar>
                </AppBar>

            }

            <OffCanvas
                setShowInterfaz={setShowInterfaz}
                showInterfaz={showInterfaz}
            />
        </>
    )
}
