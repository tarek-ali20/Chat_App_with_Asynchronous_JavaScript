// Import the WebSocket library
const WebSocket = require('ws');

// Create a new WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// When a client connects to the WebSocket server
wss.on('connection', (ws) => {
    console.log('A new client connected');

    // Send a message to the connected client
    ws.send('Welcome to the chat server!');

    // When a message is received from the client
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        
        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle when a client disconnects
    ws.on('close', () => {
        console.log('A client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');
