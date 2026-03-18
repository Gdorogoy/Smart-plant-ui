import React from 'react';
import { Card, Box, Typography, LinearProgress, Stack } from '@mui/material';
import colors from '../../../assets/Colors';

const Plant = ({ name, imageUrl, }) => {
    const plant = {
        name: 'Rose 🌹',
        level: 12,
        xp: 2450,
        nextLevelXp: 3000
    }
    const proggress = (plant.xp / plant.nextLevelXp) * 100

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
                flexDirection: 'column'
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
                    src={imageUrl || 'https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?auto=format&fit=crop&q=80'} // Default fallback plant image
                    alt={name}
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
                    {name || 'Unknown Plant'}
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
                        {plant.xp} / {plant.nextLevelXp}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Plant;
