import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [appStatus, setAppStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    clearInterval(timer);

    if (appStatus === 'off') {
      setTime(1200);
      setAppStatus('work');
    } else {
      const newStatus = appStatus === 'work' ? 'rest' : 'work';
      setTime(newStatus === 'work' ? 1200 : 20);
      setAppStatus(newStatus);
    }

    setTimer(setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000));
  };

  useEffect(() => {
    if (time === 0 && (appStatus === 'work' || appStatus === 'rest')) {
      playBell();
    }
  }, [time, appStatus]);

  const stopTimer =() =>{
    clearInterval(timer);
    setTime(0);
    setAppStatus('off');
  };

  const closeApp =() =>{
    window.close();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
      String(minutes).padStart(2, '0') +
      ':' +
      String(seconds).padStart(2, '0')
    );
  };

 const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };
  useEffect(() => {
    if (time === 0) {
      clearInterval(timer);

      if (appStatus === 'work') {
        setTime(1200);
        setAppStatus('rest');
      } else if (appStatus === 'rest') {
        setTime(20);
        setAppStatus('work');
      }

      setTimer(setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000));
    }
  }, [time, appStatus]);


  return (
    <div>
      <h1>Protect your eyes</h1>
      {appStatus === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      {appStatus === 'work' && (
        <img src="./images/work.png" alt="Work" />
      )}
      {appStatus === 'rest' && (
        <img src="./images/rest.png" alt="Rest" />
      )}
      {appStatus !== 'off' && (
        <div className="timer">{formatTime(time)}</div>
      )}
      {appStatus === 'off' && (
        <button className="btn" onClick={startTimer}>Start</button>
      )}
      {appStatus !== 'off' && (
        <button className="btn" onClick={stopTimer}>Stop</button>
      )}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));