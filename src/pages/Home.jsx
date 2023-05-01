import Meet from "./Meet"
import CountdownTimer from "../components/Timer";
const Home = ()=>{
    const ten_sec = 10 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAftertenSec = NOW_IN_MS + ten_sec;

  return (
    <div>
      <h1>Countdown Timer</h1>
      <CountdownTimer targetDate={dateTimeAftertenSec} />
    </div>
  );
}

export default Home