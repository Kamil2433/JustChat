const express = require('express');
const app = express();



const io = require('socket.io')(5000,{
  cors:{
    origin:'*'
  }
})


// serve up production assets
app.use(express.static('client/build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
const path = require('path');
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// if not in production use the port 5000
const PORT = process.env.PORT || 5000;
console.log('server started on port:',PORT);
app.listen(PORT);

// const httpServer = http.createServer()

// const io = require("socket.io")(httpServer, {
//    cors: {
//     origin: "http://localhost:5000",
//     methods: ["GET", "POST"],
//     credentials: true

//   }
//  });

io.on('connection', socket => {
  
  // io.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");

  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipient, text }) => {
    // recipients.forEach(recipient => {
    //   const newRecipients = recipients.filter(r => r !== recipient)
    //   newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: recipient, sender: id, text
      })
    })
  })
