import React, { useContext, useEffect } from 'react'
import { PlantContext } from '../../Context/PlantContext'
import { Box, Typography } from '@mui/material'
import Plant from './Plant'
import colors from '../../assets/Colors'
import Header from '../Header/Header'

const Plants = () => {

    const { plants, userProfile, setLoading, loading, auth } = useContext(PlantContext)

    useEffect(() => {
        if (!userProfile) return;
    }, [userProfile]);


    console.log(plants)

    return (
        <>
            <Header></Header>


            <Box sx={{ p: 4, height: '100%', overflow: 'auto', width: '100%' }}>
                <Typography variant="h4" sx={{ color: colors.foreground, mb: 4, fontWeight: 'bold' }}>
                    My Plants
                </Typography>

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
        </>
    )
}

export default Plants