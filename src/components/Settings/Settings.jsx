import React, { useContext, useState } from 'react';
import { Box, Typography, Button, TextField, Paper, Grid } from '@mui/material';
import { PlantContext } from '../../Context/PlantContext';
import Header from '../Header/Header';
import colors from '../../assets/Colors';



const Settings = () => {
    const { userProfile } = useContext(PlantContext);

    const convertToMin = (time) => {
        return time / 1000 / 60;
    }

    const formatTooltip = (minutes) => {
        const h = minutes / 60;
        const m = (h - Math.floor(h)) * 60;
        return m > 0 ? `${Math.floor(h)}h ${Math.floor(m)}m` : `${Math.floor(h)}h`
    }

    const [username, setUsername] = useState(userProfile?.username || "testplanter");
    const [email, setEmail] = useState(userProfile?.email || "user@example.com");
    const [goal, setGoal] = useState(formatTooltip(convertToMin(userProfile?.goal || 10800000)));

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = () => {
        console.log("Changing password...");
        setCurrentPassword('');
        setNewPassword('');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <Header />

            <Box sx={{ p: 4, height: '100%', overflow: 'auto', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: 700 }}>
                    <Typography variant="h4" sx={{ color: colors.foreground, mb: 4, fontWeight: 'bold' }}>
                        Settings
                    </Typography>

                    <Paper sx={{ bgcolor: colors.accent, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', overflow: 'hidden', border: `1px solid ${colors.foreground}40` }}>
                        {/* User Info Section */}
                        <Box sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ color: colors.chart2, mb: 4, fontWeight: 'bold', letterSpacing: 0.5 }}>
                                Account Profile
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2, borderBottom: `1px solid ${colors.background}60` }}>
                                    <Typography sx={{ color: colors.foreground, fontSize: '1rem' }}>Username</Typography>
                                    <Typography sx={{ color: colors.foreground, fontSize: '1.05rem', fontWeight: 500 }}>{username}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2, borderBottom: `1px solid ${colors.background}60` }}>
                                    <Typography sx={{ color: colors.foreground, fontSize: '1rem' }}>Email</Typography>
                                    <Typography sx={{ color: colors.foreground, fontSize: '1.05rem', fontWeight: 500 }}>{email}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                                    <Typography sx={{ color: colors.foreground, fontSize: '1rem' }}>Daily Goal</Typography>
                                    <Typography sx={{ color: colors.chart1, fontSize: '1.05rem', fontWeight: 600 }}>{goal}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ height: 1, bgcolor: `${colors.background}60`, width: '100%' }} />

                        {/* Password Change Section */}
                        <Box sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ color: colors.chart2, mb: 4, fontWeight: 'bold', letterSpacing: 0.5 }}>
                                Security & Password
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <TextField
                                    label="Current Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            color: colors.foreground,
                                            bgcolor: 'rgba(0,0,0,0.2)',
                                            borderRadius: 2,
                                            '& fieldset': { borderColor: colors.foreground },
                                            '&:hover fieldset': { borderColor: colors.chart2 },
                                            '&.Mui-focused fieldset': { borderColor: colors.chart1 },
                                        },
                                        '& .MuiInputLabel-root': { color: colors.foreground },
                                        '& .MuiInputLabel-root.Mui-focused': { color: colors.chart1 },
                                    }}
                                />

                                <TextField
                                    label="New Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            color: colors.foreground,
                                            bgcolor: 'rgba(0,0,0,0.2)',
                                            borderRadius: 2,
                                            '& fieldset': { borderColor: colors.foreground },
                                            '&:hover fieldset': { borderColor: colors.chart2 },
                                            '&.Mui-focused fieldset': { borderColor: colors.chart1 },
                                        },
                                        '& .MuiInputLabel-root': { color: colors.foreground },
                                        '& .MuiInputLabel-root.Mui-focused': { color: colors.chart1 },
                                    }}
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={handlePasswordChange}
                                        disabled={!currentPassword || !newPassword}
                                        sx={{
                                            bgcolor: colors.chart2,
                                            color: colors.background,
                                            fontWeight: 'bold',
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            boxShadow: `0 4px 14px ${colors.chart2}40`,
                                            '&:hover': {
                                                bgcolor: colors.chart1,
                                                boxShadow: `0 6px 20px ${colors.chart1}60`,
                                                transform: 'translateY(-1px)'
                                            },
                                            transition: 'all 0.2s',
                                            '&.Mui-disabled': {
                                                bgcolor: colors.foreground,
                                                color: colors.accent,
                                                boxShadow: 'none'
                                            }
                                        }}
                                    >
                                        Update Password
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Settings;
