const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const socket = new Server(httpServer,{
    cors: {
        origin: "http://localhost:5173" //i wana fix cross oring issue 
    }
}); 
var playersScores = [];
socket.on("connection", (sio)=>{
    // console.log("SOCKET: ", sio);
    sio.on("scores",(data)=>{
        console.log(data);
        playersScores.push({...data, id:sio.id });
        sio.emit("playersScores",playersScores);
    });

    // setInterval(() => {
    // }, 5000);

});

httpServer.listen('4000', ()=>{
    console.log("SERVER IS RUING ON PORT 4000"); 
});