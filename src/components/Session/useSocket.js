import { useEffect } from "react";
import { useState } from "react";
import { io } from 'socket.io-client';



const useSocket = () => {

  const connect = () => {
    const s = io('http://localhost:3000'); // { query: { token } } to pass the token 
    return s;
  }

  const start = (data, s) => {
    s.emit('start', data);
  }

  const onSessionStarted = (s, callback) => {
    s.on('sessionStarted', (response) => {
      //TODO:
      console.log("=======")
      console.log(response);
      console.log("=======")

      callback(response);

      //2. start timer 
      //3. if user closed tab stop timer and save the time 
      //4. if user came back restart the timer and send the time when he left insted the current time (add in back)
    });
  }

  const end = (sessionId, s) => {
    s.emit('end', sessionId);

  }

  const onSessionEnded = (s, callback) => {

    s.on('sessionEnded', (response) => {
      //TODO
      //1. stop timer 
      //2. remove session id & timer from local storage
      //3. refetch the page for updating stats
      callback(response);
    });
  }

  return { connect, start, end, onSessionStarted, onSessionEnded };

}

export default useSocket