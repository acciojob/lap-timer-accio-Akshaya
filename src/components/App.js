import React, { useState, useEffect, useRef } from "react";
import "./../styles/App.css";

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    }
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  const handleReset = () => {
    handleStop();
    setTime(0);
    setLaps([]);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const padZero = (num) => (num < 10 ? `0${num}` : num);

  const formatTime = (centiseconds) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;

    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(cs)}`;
  };

  return (
    <div className="App">
      <h1>Lap Timer</h1>
      <div className="timer">{formatTime(time)}</div>

      <div className="controls">
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleStop}>Stop</button>
        )}
        <button onClick={handleLap} disabled={!isRunning}>
          Lap
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <ul className="laps">
        {laps.map((lapTime, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
