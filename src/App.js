import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  var [currentTime, setCurrentTime] = useState(0);

  const getCurrentTime = () => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });
  };
  getCurrentTime();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(currentTime + 1);
    }, 1000);
  }, [currentTime]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>This app has been running for {currentTime}</p>
      </header>
    </div>
  );
}

export default App;
