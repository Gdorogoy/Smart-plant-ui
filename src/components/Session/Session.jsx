import React, { useState, useContext, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Tabs, Tab, Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography,
    Stack,
    Autocomplete,
} from '@mui/material';

import { LocalizationProvider, } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { PlantContext } from '../../Context/PlantContext';
import dayjs from 'dayjs';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const Session = ({ open, onClose, isActive, setIsActive, time, setTime }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const { plants } = useContext(PlantContext);

    const [selectedPlantRecord, setSelectedPlantRecord] = useState('');
    const [selectedPlantUpload, setSelectedPlantUpload] = useState('');
    const [startTime, setStartTime] = useState(dayjs(new Date()));
    const [endTime, setEndTime] = useState(dayjs(new Date()));
    const [sessionId, setSessionId] = useState(null);

    // restore sessionId on mount
    useEffect(() => {
        const saved = localStorage.getItem('activeSession');
        if (saved) {
            const { sessionId: savedId } = JSON.parse(saved);
            if (savedId) setSessionId(savedId);
        }
    }, []);

    // save elapsed on tab close
    useEffect(() => {
        const handleUnload = () => {
            if (!isActive) return;
            const saved = localStorage.getItem('activeSession');
            if (saved) {
                const parsed = JSON.parse(saved);
                localStorage.setItem('activeSession', JSON.stringify({
                    ...parsed,
                    timer: time
                }));
            }
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, [isActive, time]);

    // tick
    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isActive]);

    const handleStartRecording = () => {
        setIsActive(true);
        localStorage.setItem('activeSession', JSON.stringify({
            sessionId: null, // replace with real sessionId from socket
            timer: 0
        }));
        // TODO: connect socket, emit start, get sessionId back
        onClose();
    }

    const handleStopRecording = () => {
        setIsActive(false);
        setTime(0);
        localStorage.removeItem('activeSession');
        // TODO: socket emit end with { sessionId, duration: time * 1000 }
        onClose();
    }

    const handleUpload = () => {
        if (!selectedPlantUpload || !startTime || !endTime) return;
        // TODO: API call
        onClose();
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold', color: '#0a5f46' }}>
                Session Management
            </DialogTitle>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)} variant="fullWidth">
                    <Tab label="Record Session" disabled={isActive} />
                    <Tab label="Upload Session" disabled={isActive} />
                </Tabs>
            </Box>

            <DialogContent sx={{ minHeight: '320px' }}>
                <TabPanel value={tabIndex} index={0}>
                    <Autocomplete
                        fullWidth
                        disablePortal
                        options={plants}
                        getOptionLabel={(option) => option.title || `Plant ${option.id}`}
                        value={plants.find(p => p.id === selectedPlantRecord) || null}
                        onChange={(_, newValue) => setSelectedPlantRecord(newValue ? newValue.id : '')}
                        disabled={isActive}
                        renderInput={(params) => <TextField {...params} label="Select Plant" />}
                        sx={{ mb: 3 }}
                    />

                    {isActive ? (
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Typography variant="h2" sx={{ mb: 1, fontWeight: 'bold', color: '#0a5f46' }}>
                                {formatTime(time)}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, color: '#0a5f46' }}>
                                Recording in progress...
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                onClick={handleStopRecording}
                                sx={{ borderRadius: 3, px: 4, py: 1.5, fontSize: '1.2rem' }}
                            >
                                Stop Recording
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                Select a plant to start recording a new session.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleStartRecording}
                                disabled={!selectedPlantRecord}
                                sx={{
                                    borderRadius: 3, bgcolor: '#0a5f46',
                                    px: 4, py: 1.5, fontSize: '1.2rem',
                                    '&:hover': { bgcolor: '#084a36' },
                                }}
                            >
                                Start Recording
                            </Button>
                        </Box>
                    )}
                </TabPanel>

                <TabPanel value={tabIndex} index={1}>
                    <Autocomplete
                        fullWidth
                        disablePortal
                        options={plants}
                        getOptionKey={(option) => option.id}
                        getOptionLabel={(option) => option.title || `Plant ${option.id}`}
                        value={plants.find(p => p.id === selectedPlantUpload) || null}
                        onChange={(_, newValue) => setSelectedPlantUpload(newValue ? newValue.id : '')}
                        renderInput={(params) => <TextField {...params} label="Select Plant" />}
                        sx={{ mb: 3 }}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack gap={2} mb={2}  >
                            <DateTimePicker
                                label="Start Time"
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                            />
                            <DateTimePicker
                                label="End Time"
                                value={endTime}
                                onChange={(newValue) => setEndTime(newValue)}
                            />
                        </Stack>
                    </LocalizationProvider>

                    <Button variant="contained" size="large" onClick={handleUpload}
                        disabled={!selectedPlantUpload || !startTime || !endTime} fullWidth
                        sx={{ borderRadius: 2, bgcolor: '#0a5f46', py: 1.5, fontSize: '1.1rem' }}>
                        Upload Session
                    </Button>
                </TabPanel>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} disabled={isActive} sx={{ color: '#0a5f46', fontWeight: 'bold' }}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Session;