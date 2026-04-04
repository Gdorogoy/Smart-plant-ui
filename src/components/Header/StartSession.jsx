import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import colors from "../../assets/Colors";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Session from "../Session/Session";

export default function StartSession() {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);

  // restore on mount
  useEffect(() => {
    const saved = localStorage.getItem('activeSession');
    if (saved) {
      const { timer } = JSON.parse(saved);
      setTime(timer || 0);
      setIsActive(true);
    }
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
  };

  return (
    <>
      {isActive ? (
        <Button
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: colors.chart1,
            color: colors.background,
            px: 4, py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: 3,
            textTransform: 'none',
          }}
        >
          {formatTime(time)} {/* ✅ live timer */}
        </Button>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          startIcon={<PlayArrowIcon />}
          sx={{
            bgcolor: colors.chart2,
            color: colors.background,
            px: 4, py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: 3,
            textTransform: 'none',
            '&:hover': { bgcolor: colors.chart3, transform: 'scale(1.02)' },
            transition: 'all 0.2s'
          }}
        >
          Start Session
        </Button>
      )}

      <Session
        open={open}
        onClose={() => setOpen(false)}
        isActive={isActive}
        setIsActive={setIsActive}
        time={time}
        setTime={setTime}
      />
    </>
  );
}