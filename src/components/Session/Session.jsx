import React, { useState, useContext, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Tabs,
    Tab,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import { PlantContext } from '../../Context/PlantContext';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`session-tabpanel-${index}`}
            aria-labelledby={`session-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Session = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const context = useContext(PlantContext);
    const plants = context?.plants || [];

    // States for Recording
    const [selectedPlantRecord, setSelectedPlantRecord] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0); // in seconds

    // States for Uploading
    const [selectedPlantUpload, setSelectedPlantUpload] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // Timer Effect
    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } else if (!isRecording && recordingTime !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRecording, recordingTime]);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleStartRecording = () => {
        if (!selectedPlantRecord) return;
        setIsRecording(true);
        setRecordingTime(0); // reset timer on start just in case
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        console.log('Stopped recording for plant ID:', selectedPlantRecord, 'Time recorded:', recordingTime);
        // You could save the session here or add further logic
    };

    const handleUpload = () => {
        if (!selectedPlantUpload || !startTime || !endTime) return;
        console.log('Uploading session', {
            plantId: selectedPlantUpload,
            startTime,
            endTime
        });
        // Add real API upload logic here
        if (onClose) onClose();
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <Dialog open={open} onClose={isRecording ? undefined : onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold', color: '#0a5f46' }}>
                Session Management
            </DialogTitle>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    aria-label="session tabs"
                    variant="fullWidth"
                    TabIndicatorProps={{ style: { backgroundColor: '#0a5f46' } }}
                    textColor="inherit"
                >
                    <Tab label="Record Session" disabled={isRecording} sx={{ '&.Mui-selected': { color: '#0a5f46' } }} />
                    <Tab label="Upload Session" disabled={isRecording} sx={{ '&.Mui-selected': { color: '#0a5f46' } }} />
                </Tabs>
            </Box>

            <DialogContent sx={{ minHeight: '320px' }}>
                {/* Record Session Tab */}
                <TabPanel value={tabIndex} index={0}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel id="record-plant-label">Select Plant</InputLabel>
                        <Select
                            labelId="record-plant-label"
                            value={selectedPlantRecord}
                            label="Select Plant"
                            onChange={(e) => setSelectedPlantRecord(e.target.value)}
                            disabled={isRecording}
                        >
                            {plants.map((plant) => (
                                <MenuItem key={plant.id || plant._id} value={plant.id || plant._id}>
                                    {plant.name || `Plant ${plant.id || plant._id}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {isRecording ? (
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Typography variant="h2" sx={{ mb: 1, fontWeight: 'bold', color: '#0a5f46' }}>
                                {formatTime(recordingTime)}
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
                                    borderRadius: 3,
                                    bgcolor: '#0a5f46',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.2rem',
                                    '&:hover': { bgcolor: '#084a36' },
                                    '&.Mui-disabled': { bgcolor: '#e0e0e0' }
                                }}
                            >
                                Start Recording
                            </Button>
                        </Box>
                    )}
                </TabPanel>

                {/* Upload Session Tab */}
                <TabPanel value={tabIndex} index={1}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel id="upload-plant-label">Select Plant</InputLabel>
                        <Select
                            labelId="upload-plant-label"
                            value={selectedPlantUpload}
                            label="Select Plant"
                            onChange={(e) => setSelectedPlantUpload(e.target.value)}
                        >
                            {plants.map((plant) => (
                                <MenuItem key={plant.id || plant._id} value={plant.id || plant._id}>
                                    {plant.name || `Plant ${plant.id || plant._id}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Start Time"
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        InputLabel={{ shrink: true }}
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="End Time"
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 3 }}
                    />

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleUpload}
                            disabled={!selectedPlantUpload || !startTime || !endTime}
                            fullWidth
                            sx={{
                                borderRadius: 2,
                                bgcolor: '#0a5f46',
                                py: 1.5,
                                fontSize: '1.1rem',
                                '&:hover': { bgcolor: '#084a36' },
                                '&.Mui-disabled': { bgcolor: '#e0e0e0' }
                            }}
                        >
                            Upload Session
                        </Button>
                    </Box>
                </TabPanel>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} disabled={isRecording} sx={{ color: '#0a5f46', fontWeight: 'bold' }}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Session;