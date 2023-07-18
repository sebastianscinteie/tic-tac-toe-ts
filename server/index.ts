const { Server } = require("socket.io")

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 8080

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer(async (req:any, res:any) => {
    try {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
 
      if (pathname === '/socket') {
        if (res.socket.server.io) {
          console.log("Server already running.");
          res.end();
          return;
        } 

        console.log("Sever is initialising.");
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on("connection", (socket:any) => {
          console.log("connection")
          socket.emit("test","bla")
          socket.on("hello", () => {
            console.log("what is happeing");
          });

          socket.on("input-change", (msg:any) => {
            console.log(msg);
          });
        });

        res.end();
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err:any) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})