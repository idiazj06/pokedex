import React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InterfazUsuario from './InterfazUsuario'
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

export const OffCanvas = (props) => {

    const handleClose = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        if (props.showInterfaz) { props.setShowInterfaz(open) }
    };
    return (
        <>
            <SwipeableDrawer
                anchor={'right'}
                open={props.showInterfaz}
                onClose={handleClose(false)}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <IconButton onClick={() => props.setShowInterfaz(false)} aria-label="delete">
                        <HighlightOffIcon />
                    </IconButton>
                </Box>
                {
                    <InterfazUsuario setShowInterfaz={props.setShowInterfaz} />
                }
            </SwipeableDrawer>
        </>
    )
}
