import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Tabs, Tab, Container, InputAdornment, IconButton, } from '@mui/material';
import { Email, Lock, Person, Visibility, VisibilityOff, } from '@mui/icons-material';
import colors from '../../assets/Colors';
import { PlantContext } from '../../Context/PlantContext';
import { login } from '../../Api/auth.api';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate()

    const { setAuthInfo, loading, setLoading } = useContext(PlantContext);

    const [tabValue, setTabValue] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (tabValue == 0) {
            const loginData = {
                email: formData.email,
                password: formData.password
            }
            const response = await login(loginData);
            if (response.status === 401) {
                alert("Invalid passwords try again");
                return;
            }
            setAuthInfo(response.accessToken, response.data);
            navigate('/home');
        }
        if (tabValue == 1) {
            const registerData = {
                email: formData.email,
                password: formData.password,
                name: formData.name
            }
            if (formData.password != formData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            const response = await register(registerData);

            setAuthInfo(response.token, response.data.userId);
            setLoading(false);
            navigate("/home")
        }

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: colors.accent,
                p: 2,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    sx={{
                        p: 6,
                        borderRadius: 4,
                        bgcolor: colors.secondary,
                        border: `1px solid ${colors.muted}`,
                        color: colors.foreground,
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                color: colors.chart1,
                                letterSpacing: '1px',
                            }}
                        >
                            Smart Plant
                        </Typography>
                        <Typography variant="body2" sx={{ color: colors.accent, mt: 1 }}>
                            {tabValue === 0 ? 'Welcome back! Please login.' : 'Join us to track your plants.'}
                        </Typography>
                    </Box>

                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            mb: 3,
                            '& .MuiTabs-indicator': {
                                backgroundColor: colors.chart1,
                            },
                        }}
                    >
                        <Tab
                            label="Login"
                            sx={{
                                color: colors.accent,
                                '&.Mui-selected': { color: colors.chart1 },
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}
                        />
                        <Tab
                            label="Register"
                            sx={{
                                color: colors.accent,
                                '&.Mui-selected': { color: colors.chart1 },
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}
                        />
                    </Tabs>

                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            {tabValue === 1 && (
                                <TextField
                                    fullWidth
                                    placeholder="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person sx={{ color: colors.accent }} />
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            color: colors.foreground,
                                            backgroundColor: colors.background,
                                            borderRadius: '12px',
                                            '& fieldset': { borderColor: colors.muted },
                                            '&:hover fieldset': { borderColor: colors.accent },
                                            '&.Mui-focused fieldset': { borderColor: colors.chart1 },
                                        },
                                        '& .MuiInputBase-input::placeholder': { color: colors.accent, opacity: 0.8 },
                                    }}
                                />
                            )}
                            <TextField
                                fullWidth
                                placeholder="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email sx={{ color: colors.accent }} />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: colors.foreground,
                                        backgroundColor: colors.background,
                                        borderRadius: '12px',
                                        '& fieldset': { borderColor: colors.muted },
                                        '&:hover fieldset': { borderColor: colors.accent },
                                        '&.Mui-focused fieldset': { borderColor: colors.chart1 },
                                    },
                                    '& .MuiInputBase-input::placeholder': { color: colors.accent, opacity: 0.8 },
                                }}
                            />
                            <TextField
                                fullWidth
                                placeholder="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock sx={{ color: colors.accent }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: colors.accent }}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: colors.foreground,
                                        backgroundColor: colors.background,
                                        borderRadius: '12px',
                                        '& fieldset': { borderColor: colors.muted },
                                        '&:hover fieldset': { borderColor: colors.accent },
                                        '&.Mui-focused fieldset': { borderColor: colors.chart1 },
                                    },
                                    '& .MuiInputBase-input::placeholder': { color: colors.accent, opacity: 0.8 },
                                }}
                            />
                            {tabValue === 1 && (
                                <TextField
                                    fullWidth
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock sx={{ color: colors.accent }} />
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            color: colors.foreground,
                                            backgroundColor: colors.background,
                                            borderRadius: '12px',
                                            '& fieldset': { borderColor: colors.muted },
                                            '&:hover fieldset': { borderColor: colors.accent },
                                            '&.Mui-focused fieldset': { borderColor: colors.chart1 },
                                        },
                                        '& .MuiInputBase-input::placeholder': { color: colors.accent, opacity: 0.8 },
                                    }}
                                />
                            )}

                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    borderRadius: 2,
                                    backgroundColor: colors.primary,
                                    '&:hover': {
                                        backgroundColor: colors.chart5,
                                    },
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            >
                                {tabValue === 0 ? 'Login' : 'Sign Up'}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Auth;
