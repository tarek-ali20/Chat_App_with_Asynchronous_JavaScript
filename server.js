const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });


wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log('Raw message received:', message); // Debugging log
        try {
            const parsedMessage = JSON.parse(message);
            console.log('Parsed message:', parsedMessage);

            // Broadcast to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ message: parsedMessage.message }));
                }
            });
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
