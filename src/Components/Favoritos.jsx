import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delFavoriteAsync, getFavoriteAsync, editFavoriteAsync } from '../Actions/actionPokemones'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};


export default function Favoritos() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.login)
    const favoritos = useSelector(state => state.favoritos)
    const { favorites } = favoritos

    const [open, setOpen] = useState(false);
    const handleOpen = (data) => {
        setOpen(true)
        setValue(data)
    };
    const handleClose = () => setOpen(false);

    const [value, setValue] = useState('')


    useEffect(() => {
        dispatch(getFavoriteAsync(user.displayName))
    }, [])

    const handleEliminar = (id) => {
        dispatch(delFavoriteAsync(user.displayName, id))
        dispatch(getFavoriteAsync(user.displayName))
    }

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value.toUpperCase()
        })

    }

    const handleEdit = (e, id) => {
        e.preventDefault()
        console.log(value)
        dispatch(editFavoriteAsync(user.displayName, id, value))
        dispatch(getFavoriteAsync(user.displayName))
        setOpen(false)
    }

    return (
        <>
            {favorites &&
                favorites.map((data, index) => (
                    <Container sx={{ mt: 12 }}>
                        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                            <Grid item className="card_favorite" sx={{ mb: -8 }}>
                                <Box>
                                    <img width="100%" src={data.data.imagenes.other.dream_world.front_default} alt="" />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="h4">
                                        {data.data.nombre.toUpperCase()}
                                    </Typography>
                                    <Box>
                                        <Button variant="contained" onClick={() => { handleOpen(data.data) }} ><EditRoundedIcon /></Button>
                                        <Button
                                            onClick={() => { handleEliminar(data.id) }}
                                            sx={{ ml: 1, bgcolor: "red" }} variant="contained" ><DeleteForeverRoundedIcon /></Button>
                                    </Box>
                                </Box>

                            </Grid>
                        </Grid>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} component="form" onSubmit={(e) => { handleEdit(e, data.id) }}>
                                <Typography variant="h6">Ingresa un nuevo nombre para tu Pokemon favorito</Typography>
                                <TextField
                                    sx={{ mt: 2 }}
                                    onChange={handleChange}
                                    id="filled-basic" name="nombre" label="Nombre" variant="filled" defaultValue={data.data.nombre.toUpperCase()} />
                                <Button
                                    sx={{ mt: 2 }} variant="outlined" type="submit">Actualizar</Button>
                            </Box>
                        </Modal>
                    </Container>
                ))

            }
        </>
    )
}
