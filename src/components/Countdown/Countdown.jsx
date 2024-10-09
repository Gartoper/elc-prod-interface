import s from './style.module.css';
import React, { useState, useEffect, useRef } from 'react';
import app from '../../firebaseConfig';
import { getDatabase, ref, set, onValue, remove } from 'firebase/database';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export function Countdown() {
  const [inputMinutes, setInputMinutes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Listen to changes in Firebase to sync timeLeft
    const db = getDatabase(app);
    const dbCountdownRef = ref(db, '0/panel/0/countdown');

    onValue(dbCountdownRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.endTime) {
        const currentTime = Date.now();
        const remainingTime = Math.max(data.endTime - currentTime, 0);
        setTimeLeft(Math.floor(remainingTime / 1000)); // Convert ms to seconds
        setIsRunning(remainingTime > 0);
      }
    });
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Start the countdown
  const startCountdown = () => {
    if (isRunning || inputMinutes === 0) return;

    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/countdown');
    const initialTimeLeft = inputMinutes * 60 * 1000; // Convert minutes to ms
    const endTime = Date.now() + initialTimeLeft; // Set end time as current time + input time

    setIsRunning(true);

    // Save the endTime in Firebase
    set(newDocRef, { endTime })
      .then(() => {
        // Sync the local countdown with Firebase
        setTimeLeft(inputMinutes * 60); // Convert minutes to seconds
      })
      .catch((error) => {
        console.error('Error updating countdown in Firebase: ', error.message);
      });
  };

  // Reset the countdown
  const resetCountdown = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(0);
    setInputMinutes(0);

    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/countdown');

    // Remove countdown from Firebase
    remove(newDocRef).catch((error) => {
      console.error('Error resetting countdown in Firebase: ', error.message);
    });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setInputMinutes(newValue);
    setTimeLeft(newValue * 60); // Set initial timeLeft in seconds
  };

  // Format the time (minutes:seconds)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  return (
    <Row style={{ textAlign: 'right', marginTop: '20px' }}>
      <Col />
      <Col xs={1}>
        <h2>
          <b>Timer</b>
        </h2>
        <h2>
          <b>{formatTime(timeLeft)}</b>
        </h2>
      </Col>
      <Col xs={2}>
        <Row className="justify-content-center mb-2">
          <Form.Control
            type="number"
            min="1"
            value={inputMinutes}
            onChange={handleInputChange}
            disabled={isRunning}
            className="w-25"
          />
          <span className="w-25 align-content-center">minutes</span>
        </Row>
        <Row className="justify-content-center">
          <Button
            variant="primary"
            onClick={startCountdown}
            className="w-25"
            disabled={isRunning || timeLeft === 0}
          >
            Start
          </Button>
          <Button
            variant="warning"
            className="w-25 ms-3"
            onClick={resetCountdown}
          >
            Reset
          </Button>
        </Row>
      </Col>
      <Col />
    </Row>
  );
}
