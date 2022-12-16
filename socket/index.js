const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { 
  cors:{
      origin: "*"
  }});

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('<h1>Servidor corriendo adecuadamente.</h1>');
  res.end();
});

let onlineUsers = [];

let addUser = (usuario, socketId) => {
    if(usuario !== null){
        var exist;
        var index;
        !onlineUsers.some(user => user.usuario === usuario)
        ? null
        : exist = onlineUsers.some(user => user.usuario === usuario)
          if(exist === true){
            index = onlineUsers.findIndex(user => user.usuario === usuario)
            onlineUsers.splice(index, 1);
          }
          onlineUsers.push({ usuario, socketId })
    }
    
};

let removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};

let getUser = (usuario) => {
    return onlineUsers.find(user => user.usuario === usuario);
};

io.on("connection", (socket) => {
  socket.on("nuevoUsuario", (usuario) => {
    console.log(`Servidor corriendo.${socket.id}`);
    addUser(usuario, socket.id);
  });

  socket.on("notificacion2", ({senderName, receiverName, nombreUsuario, type}) => {
        let receiver = getUser(receiverName);
      if(receiver !== undefined){
        io.to(receiver.socketId).emit("obtenernotificacion", {senderName, nombreUsuario, type});
      }
  });

  socket.on("mensaje", ({senderName, receiverName, nombreUsuario, texto}) => {
    let receiver = getUser(receiverName);
    if(receiver !== undefined){
      io.to(receiver.socketId).emit("obtenerMensaje", {senderName, nombreUsuario, texto});
    }
  });


  socket.on("Desconectado", () => {
    removeUser(socket.id);
    //console.log("me desconecte")
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});