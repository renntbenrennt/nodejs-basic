const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};
channel.on('join', (id, client) => {
    this.clients[id] = client;
    this.subscriptions[id] = (senderId, message) => {
        if (id !== senderId) {
            this.clients[id].write(message);
        }
    }
})