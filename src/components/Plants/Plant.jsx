import React from 'react';
import { Box, Typography, LinearProgress, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import colors from '../../assets/Colors';

const Plant = ({ plants, setLoading, loading, userProfile, lastActivePlantId, singlePlant }) => {

    const [userPlants, setUserPlant] = useState([]);
    const [plant, setPlant] = useState(null);

    useEffect(() => {
        if (singlePlant) {
            setPlant(singlePlant);
            return;
        }

        if (!plants?.length || !userProfile) return;
        setLoading(true);

        const found = plants.find(p => p.id === lastActivePlantId);

        setUserPlant(plants);
        setPlant(found || plants[0]);

        setLoading(false);

    }, [plants, userProfile, lastActivePlantId]);

    console.log(plant)
    const proggress = plant ? (plant.currentXp / plant.nextLevelXp) * 100 : 1

    if (!plant) return null;
    return (
        <Box
            sx={{
                bgcolor: colors.accent,
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: 250,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0
            }}
        >
            <Box sx={{
                flex: 4,
                overflow: 'hidden',
                borderRadius: 3,
                m: 1
            }}>
                <Box
                    component="img"
                    src={plant?.image || 'missing image'} // Default fallback plant image
                    alt={plant?.title || 'unkown plant'}
                    sx={{
                        p: 2,
                        borderRadius: 5,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        '&:hover': {
                            transform: 'scale(1.02)'
                        }
                    }}
                />
            </Box>
            <Box sx={{
                flex: 1,
                p: 1

            }}>
                <Typography
                    variant="h6"
                    sx={{
                        color: colors.foreground,
                        fontWeight: 'bold',
                        lineHeight: 1.2,
                    }}
                >
                    {plant.title || 'Unknown Plant'}
                </Typography>

                {/* Progress Bar Area */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                }}>
                    <LinearProgress
                        variant="determinate"
                        value={proggress}
                        sx={{
                            flex: 1,
                            borderRadius: 3,
                            height: 5,
                            bgcolor: colors.background,
                            '& .MuiLinearProgress-bar': {
                                bgcolor: colors.chart2,
                                borderRadius: 3,
                            },
                        }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 1
                }}>
                    <Typography
                        sx={{
                            color: colors.foreground,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                        }}
                    >
                        {Math.round(proggress)}%
                    </Typography>
                    <Typography
                        sx={{
                            color: colors.foreground,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                        }}
                    >
                        {plant?.currentXp} / {plant?.nextLevelXp}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Plant;
