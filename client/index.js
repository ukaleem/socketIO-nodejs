const socket = io("http://localhost:4000");
var resp;
socket.on("connect", (sk)=>{
    console.log(sk,socket);
    socket.emit('message',"hii777777799999999")
});

socket.on("message",(data)=>{
    console.log("DATA from MESSAGE: ",data);
    resp = data;
    document.getElementById('messages').innerHTML = resp;
    
});

function sendMessage(ev) {
    let messageVal = document.getElementById('messageRep');
    console.log("im in",messageVal,ev);
}


