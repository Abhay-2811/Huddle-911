import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from '../hooks/useCountdown';
import { ethers } from 'ethers';
import { contractAdd, contractABI } from '../constants/contract';
import './timer.css'

const ExpiredNotice = () => {

  
  return (
    <div className="expired-notice">
      <span>Meet Expired!!!</span>
      <p>Hope you were satisfied. Keep an eye on history for Bill, Report and Prescription.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
        <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={seconds <=5} />
    </div>
  );
};

const CountdownTimer = ({props, targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  
  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
