// const { Server } = require("socket.io")
// const express = require("express")
// const next = require('next')
 
// const dev = process.env.NODE_ENV !== 'production'
// const hostname = 'localhost'
// const port = 3000
// // when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port })
// const handle = app.getRequestHandler()
 
// app.prepare().then(() => {
//   const e = express()

//   e.get("/socket", (req:any, res:any) => {
//     if (res.socket.server.io) {
//       console.log("Server already running.");
//       res.end();
//       return;
//     } 

//     console.log("Sever is initialising.");
//     const io = new Server(res.socket.server);
//     res.socket.server.io = io;

//     io.on("connection", (socket:any) => {
//       socket.on("hello", () => {
//         console.log("what is happeing");
//       });

//       socket.on("input-change", (msg:any) => {
//         console.log(msg);
//       });
//     });

//   });
  
//   e.get('*', (req:any, res:any) => {
//     return handle(req, res)
//   })

//   e.listen(3000, (err:any) => {
//     if (err) throw err
//     console.log('> Ready on http://localhost:3000')
//   })
// })