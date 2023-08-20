


const io = require('socket.io')(5000,{
  cors:{
    origin:'*'
  }
})


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
