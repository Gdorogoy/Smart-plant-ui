import { Box, Typography } from '@mui/material';
import colors from '../../assets/Colors';
export const DaysOfWeeks = ({weekdays,firstDay,dayOfWeek,offset}) => {

    return (
        <Box
            sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 50px)',
            justifyContent: 'center',
            gap: 1,
            mb: -1
            }}
        >
            {weekdays.map((day) => (
            <Typography
                key={day}
                sx={{
                color: colors.foreground,
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'center',
                mb:-2,
                }}
            >
                {day}
            </Typography>
            ))}
        </Box>
    );
}
