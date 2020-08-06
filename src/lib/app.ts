import * as express from 'express';
import * as socketio from 'socket.io';
import * as http from 'http';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const io: socketio.Server = socketio(server);

app.use(express.static('./public'));

let messages: Array<object> = [];


interface Payload {
  createdAt: string;
  text: string;
}

app.get('/info', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.log(req.query);
  res.send('hitting our slash route');
});

app.get('/about', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.log(req.query);
  res.send('hitting the about route');
});

io.on('connection', (socket: socketio.Socket): void => {
  console.log('socket connected');
  
  socket.on('message', (message: Payload): void => {
    messages.push(message);
    console.log(messages);
  })
  socket.on('disconnect', (): void => {
    console.log('I just disconnected');
  });
  
  
});


export default {
  start: (port: number): void => {
    server.listen(port, (): void => {
      console.log('App running');
    });
  },
}