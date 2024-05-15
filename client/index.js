const socket = io("http://localhost:3000/");

socket.on("connect", (socket)=>{
    console.log("SOCKET RESPONSE : ",socket);
});

socket.on("Message",(data)=>{
    console.log("DATA from MESSAGE: ",data);
    socket.emit("Message","All good bro");

})


