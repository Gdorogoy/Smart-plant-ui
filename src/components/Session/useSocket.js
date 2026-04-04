import { useEffect } from "react";
import { useState } from "react";
import { io } from 'socket.io-client';



const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {

  }, []);

  const connect = () => {
    const s = io('http://localhost:3002'); // { query: { token } } to pass the token 
    setSocket(s);
  }

  const start = (data) => {
    socket.emit('start', JSON.stringify(data));
    socket.on('sessionStarted', (response) => {
      //TODO:
      const { sessionId } = JSON.parse(response);
      localStorage.setItem('sessionId', sessionId);

      //2. start timer 
      //3. if user closed tab stop timer and save the time 
      //4. if user came back restart the timer and send the time when he left insted the current time (add in back)
    });
  }

  const end = (sessionId) => {
    socket.emit('end', JSON.stringify({ sessionId: sessionId }));
    socket.on('sessionEnded', () => {
      //TODO
      //1. stop timer 
      //2. remove session id & timer from local storage
      //3. refetch the page for updating stats
    });

  }

  return { socket, connect, start, end };

}

export default useSocket