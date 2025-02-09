import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Modal, Box, Typography, Button, Popover} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

function MapMarkerComponent(props) {
    const [modal, setModal] = useState(false);
    const [showHospital, setShowHospital] = useState(false);
    const id = showHospital ? 'simple-popover' : undefined;

    console.log(props.details.satisfaction_summary_stats)

    return (
        <React.Fragment>
            <Marker position={{lat: props.details.lat, lng: props.details.lon}}
                onClick={() => {setModal(true)}}>
            
            </Marker>
            <Modal
            open={modal}
            onClose={() => {setModal(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={{ ...style, width: "60vw", height: "80vh", display: "flex", flexDirection: "column", alignItems: "left"}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.details.name}
                </Typography>
                <Button sx={{backgroundColor:"black",padding: "10px", display: "flex", flexDirection: "column", alignItems: "center"}} aria-describedby={id} variant="contained" onClick={() => {setShowHospital(!showHospital)}}>
                    Overall Rating: {props.details.satisfaction_summary_stats["Overall hospital rating"]}
                    {showHospital && Object.keys(props.details.satisfaction_summary_stats).map((stat, index) => (
                    <Typography key={index} id="modal-modal-description" sx={{ mt: 2 }}>
                        {stat} - {props.details.satisfaction_summary_stats[stat]}
                    </Typography>
                ))}
                </Button>
                
                
            </Box>
            </Modal>
        </React.Fragment>
        
        
    )
}

export default MapMarkerComponent;