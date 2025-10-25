"use client"

import classes from '../Card/Card.module.css';
import { useEffect, useState } from 'react';

export default function CountdownTimer({ expiry }: { expiry: Date }) {
  const [dateOb, setDateOb] = useState({
    day: '00',
    hour: '00',
    minute: '00',
    second: '00'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      calcDateDiff(expiry);
    }, 1000);

    return () => clearInterval(interval);
    }, [])


  function calcDateDiff(endDay: Date): void {
    const dDay = endDay.valueOf();
    const milliSecondsInASecond = 1000;
    const hoursInADay = 24;
    const minutesInAnHour = 60;
    const secondsInAMinute = 60;

    const diff = dDay - Date.now();
    if (diff < 0) {
      console.log('need to do something to change view.. reload the page probably');
    }

    const daysValue = Math.floor(diff / (milliSecondsInASecond * minutesInAnHour * secondsInAMinute * hoursInADay));

    const hoursValue = Math.floor((diff / (milliSecondsInASecond * minutesInAnHour * secondsInAMinute)) % hoursInADay);

    const minutesValue = Math.floor((diff / (milliSecondsInASecond * minutesInAnHour)) % secondsInAMinute);

    const secondsValue = Math.floor(diff / milliSecondsInASecond) % secondsInAMinute;

    const day = daysValue < 10 ? `0${daysValue}` : `${daysValue}`;
    const hour = hoursValue < 10 ? `0${hoursValue}` : `${hoursValue}`;
    const minute = minutesValue < 10 ? `0${minutesValue}` : `${minutesValue}`;
    const second = secondsValue < 10 ? `0${secondsValue}` : `${secondsValue}`;

    setDateOb({
      day,
      hour,
      minute,
      second
    })
  }

  return <div className={classes.countdown}>
    <div className={classes.inc}>{ dateOb.day }</div>:<div className={classes.inc}>{ dateOb.hour }</div>:<div className={classes.inc}>{ dateOb.minute }</div>:<div className={classes.inc}>{ dateOb.second }</div>
  </div>
}