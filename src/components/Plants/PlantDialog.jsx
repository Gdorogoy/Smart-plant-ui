import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, Fade } from '@mui/material'
import React, { useState, useEffect } from 'react'
import colors from '../../assets/Colors'
import CloseIcon from '@mui/icons-material/Close'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

const PlantDialog = ({ open, handleClose, data, handleFormSubmit }) => {
    const [name, setName] = useState('');

    // Reset or set data whenever the dialog opens
    useEffect(() => {
        if (open) {
            setName(data ? data.name : '');
        }
    }, [open, data]);

    const customSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        handleFormSubmit({ ...data, name });
        handleClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    sx: {
                        bgcolor: colors.accent,
                        borderRadius: 4,
                        minWidth: { xs: '90%', sm: 400 },
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    }
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" component="div" fontWeight="bold" color={colors.foreground}>
                    {data ? "Edit Plant" : "Add New Plant"}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ color: colors.foreground }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ px: 3, pb: 1 }}>
                <form id="plant-form" onSubmit={customSubmit}>
                    <TextField
                        autoFocus
                        label="Plant Name"
                        placeholder="e.g. Monstera"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                color: colors.foreground,
                                borderRadius: 3,
                                '& fieldset': {
                                    borderColor: colors.muted,
                                },
                                '&:hover fieldset': {
                                    borderColor: colors.chart2,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: colors.chart2,
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: colors.foreground,
                                '&.Mui-focused': {
                                    color: colors.chart2,
                                }
                            }
                        }}
                    />
                </form>
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 2, display: 'flex', gap: 2 }}>
                <Button
                    onClick={handleClose}
                    sx={{
                        color: colors.foreground,
                        flex: 1,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                            bgcolor: colors.muted,
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    form="plant-form"
                    variant="contained"
                    sx={{
                        bgcolor: colors.chart2,
                        color: colors.background,
                        flex: 1,
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
                    {data ? "Save Changes" : "Create Plant"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PlantDialog