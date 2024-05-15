const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const socket = new Server(httpServer,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
}); 

socket.on("connection", (socket)=>{
    // console.log("SOCKET: ", socket);
    socket.emit("Message","Hellow kaleem sab");
    socket.on("Message",(data)=>{
        console.log("CLIENT SAID: ", data)
    });
});

httpServer.listen('3000', ()=>{
    console.log("SERVER IS RUING ON PORT 3000"); 
});