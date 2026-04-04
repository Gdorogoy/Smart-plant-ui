import { Box, Typography } from '@mui/material';
import colors from '../../../assets/Colors';
export const DaysOfWeeks = ({ weekdays, firstDay, dayOfWeek, offset }) => {

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                justifyContent: 'center',
                gap: { xs: 0.5, md: 1 },
                mb: -1,
            }}
        >
            {weekdays.map((day) => (
                <Typography
                    key={day}
                    sx={{
                        color: colors.foreground,
                        fontSize: { xs: '0.8rem', md: '1rem' },
                        fontWeight: 600,
                        textAlign: 'center',
                        mb: 1,
                    }}
                >
                    {day}
                </Typography>
            ))}
        </Box>
    );
}
