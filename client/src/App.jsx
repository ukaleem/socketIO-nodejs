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

      socket.on("playersScores", (ps) => {
        console.log("ON LOAD SERVER DATA:  ", ps)
        setGlobalScores(ps);
      });

    });
  }

  function emitMessage() {
    console.log("EMITED DATA: ", score);
    socket.emit("scores", score);

    socket.on("playersScores", (ps) => {
      console.log("ON SUBMIT SERVER RESP ", ps)
      setGlobalScores(ps)
      console.log("GLOBAL OBJ", globalScores)
    });

  }

  useEffect(() => {
    connectSocket();
  }, [])

  return (
    <>
      <h1>Multi player dashboard {message}</h1>
      <Inputs name="name" placeholder="Enter your name!" inputHandler={inputsHandler}></Inputs>
      <Inputs name="score" placeholder="Your Score" inputHandler={inputsHandler}></Inputs>

      <button onClick={emitMessage}>Submit</button>

      <hr />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {
            globalScores.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.score}</td>
                </tr>
              )
            })
          }

        </tbody>
      </table>
    </>
  )
}

export default App
