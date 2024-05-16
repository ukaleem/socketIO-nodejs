const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const socket = new Server(httpServer,{
    cors: {
        origin: "*" //i wana fix cross oring issue 
    }
}); 

socket.on("connection", (sio)=>{
    console.log("SOCKET: ", sio);

    sio.emit("message","Hellow kaleem sab kesy ain");
    sio.on("message",(data)=>{
        console.log(data)
    });
});

httpServer.listen('4000', ()=>{
    console.log("SERVER IS RUING ON PORT 4000"); 
});