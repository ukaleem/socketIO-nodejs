/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './App.css'
import { io } from "socket.io-client";
import Inputs from './component/Inputs';

const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState('');
  let [score, setScores] = useState({});
  let [globalScores, setGlobalScores] = useState([]);


  function inputsHandler(event) {
    let { name, value } = event.target;
    let newObject = { [name]: value };
    setScores((prev) => {
      return {
        ...prev,
        ...newObject
      }
    });

  }
  function connectSocket() {
    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx

      socket.on("playersScores", (playersScores) => {
        console.log("SERVER COMING DATA:  ", playersScores)
        setGlobalScores(playersScores);
      });

    });
  }

  function emitMessage() {
    console.log("EMITED DATA: ", score);
    socket.emit("scores", score);

    socket.on("playersScores", (playersScores) => {
      console.log("SERVER RESP ", playersScores)
      setGlobalScores(playersScores)
    });

  }

  useEffect(() => {
    connectSocket();
  }, [])

  return (
    <>
      <h1>Multi player dashboard {message}</h1>
      <Inputs name="player-name" placeholder="Enter your name!" inputHandler={inputsHandler}></Inputs>
      <Inputs name="player-score" placeholder="Your Score" inputHandler={inputsHandler}></Inputs>

      <button onClick={emitMessage}>Submit</button>

      { globalScores.length>0 ? 
      globalScores.map((s) => {
        <div>
          <h1>Player Name: {s.playerName}</h1>
          <h1>Player Score: {s.playerScore}</h1>
        </div>
      })
      : <></>

      }
    </>
  )
}

export default App
