import React from 'react'
import colors from '../../../assets/Colors'
import { Box, Typography } from '@mui/material'

const DayComponent = ({ day, index, getDayColor, getTextColor, activeDays, empty }) => {
  if (empty) {
    return <Box sx={{
      width: 50,
      height: 50
    }} />
  }

  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        bgcolor: getDayColor(index),
        borderRadius: 1.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.1s ease-in-out, box-shadow 0.1s',
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: `0 4px 12px rgba(0,0,0,0.2)`,
          zIndex: 2,
          bgcolor: colors.chart3,
        }
      }}
    >

      {/* Date number */}
      <Typography sx={{
        color: getTextColor(index),
        fontSize: '1rem',
        fontWeight: 800,
        lineHeight: 1.2,
        my: 0.3
      }}>
        {day.date()}
      </Typography>

      {/* Activity time */}

      {activeDays.has(day.format('YYYY-MM-DD')) && (
        <Typography sx={{
          color: getTextColor(index),
          fontSize: '0.55rem',
          fontWeight: 'bold',
        }}>
          30M
        </Typography>
      )}
    </Box>
  )
}

export default DayComponent