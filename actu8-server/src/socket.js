import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3000');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function listenForUpdates(cb) {
  socket.on('update', update => cb(null, update));
}
export { subscribeToTimer, listenForUpdates };