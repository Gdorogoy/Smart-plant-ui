import React, { useContext, useEffect } from 'react'
import { PlantContext } from '../../Context/PlantContext'
import { Box, Button, IconButton, Typography } from '@mui/material'
import Plant from './Plant'
import colors from '../../assets/Colors'
import Header from '../Header/Header'
import AddIcon from '@mui/icons-material/Add';
import PlantDialog from './PlantDialog'
import { useState } from 'react'

const Plants = () => {

    const { plants, userProfile, setLoading, loading, auth } = useContext(PlantContext);

    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!userProfile) return;
    }, [userProfile]);

    const handleAddPlant = () => {
        setOpen(true);
        setData(null);
    }

    const handleFormSubmit = () => {
    }

    return (
        <>
            <Header></Header>


            <Box sx={{ p: 4, height: '100%', overflow: 'auto', width: '100%' }}>
                <Box display={'flex'} gap={2} alignItems={'center'} flexDirection={'row'}>
                    <Typography variant="h4" sx={{ color: colors.foreground, mb: 4, fontWeight: 'bold' }}>
                        My Plants
                    </Typography>
                    <Button
                        onClick={handleAddPlant}
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            color: colors.background,
                            mb: 4,
                            bgcolor: colors.chart2,
                            borderRadius: 3,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            boxShadow: 'none',
                            '&:hover': {
                                bgcolor: colors.chart2,
                                opacity: 0.9,
                                boxShadow: 'none',
                            }
                        }}
                    >
                        Add Plant
                    </Button>
                </Box>



                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 4,
                    pb: 4
                }}>
                    {plants && plants.map((plant) => (
                        <Box key={plant.id} sx={{ height: 320 }}>
                            <Plant singlePlant={plant} />
                        </Box>
                    ))}
                </Box>
            </Box>
            <PlantDialog open={open} handleClose={() => setOpen(false)} data={data} handleFormSubmit={handleFormSubmit}></PlantDialog>
        </>
    )
}

export default Plants