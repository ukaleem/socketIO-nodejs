/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './App.css'
import { io } from "socket.io-client";
import Inputs from './component/Inputs';

const socket = io('http://localhost:4000');

function App() {
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

  function editData(item){
    console.log(item);
    setScores((prev) => {
      return {
       ...prev,
        [item.name]: item.score
      }
    });
  }

  function onSubmit() {
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
      <h1>Multi player dashboard</h1>
      <Inputs name="name" placeholder="Enter your name!" value={inputsHandler.name} inputHandler={inputsHandler}></Inputs>
      <Inputs name="score" placeholder="Your Score" value={inputsHandler.score} inputHandler={inputsHandler}></Inputs>

      <button onClick={onSubmit}>Submit</button>

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
                  <td><button onClick={()=>{editData(item)}}>Edit</button></td>
                  <td><button onClick={()=>{console.log("Delete Called!")}}>Delete</button></td>
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
