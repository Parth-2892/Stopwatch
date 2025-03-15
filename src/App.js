import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
   }, 
  [running]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return {
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
      milliseconds: milliseconds < 10 ? `0${milliseconds}` : milliseconds,
    };
  };

  const { minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="app">
      <h1>Stopwatch</h1>
      <div className="stopwatch">
        <h2>
          <span className="time-segment">{minutes}</span>:
          <span className="time-segment">{seconds}</span>:
          <span className="time-segment">{milliseconds}</span>
        </h2>
        <div className="buttons">
          <button onClick={() => setRunning(true)} disabled={running}>Start</button>
          <button onClick={() => setRunning(false)} disabled={!running}>Stop</button>
          <button 
            onClick={() => {
              setTime(0);
              setRunning(false);
            }}
            className="reset">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default App;
