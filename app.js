
console.log("Hello, Node.js!");

// The URL of the API or WebSocket endpoint
const apiUrl = 'https://your-api-endpoint.com/messages';  // Replace with actual API endpoint

// Elements from the DOM
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');
const messageFeed = document.getElementById('message-feed');

// Send message function (using Fetch API)
async function sendMessage(message) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        
        const result = await response.json();
        console.log('Message sent:', result);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Fetch messages function (using Fetch API)
async function fetchMessages() {
    try {
        const response = await fetch(apiUrl);
        const messages = await response.json();
        updateMessageFeed(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

// Update the chat UI with new messages
function updateMessageFeed(messages) {
    messageFeed.innerHTML = '';  // Clear the feed
    messages.forEach((msg) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = msg.message;
        messageFeed.appendChild(messageElement);
    });
}

// Listen for the "Send" button click
sendButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (message) {
        await sendMessage(message);
        messageInput.value = '';  // Clear input after sending
    }
});

// Real-time message fetching every 2 seconds
setInterval(fetchMessages, 2000);

// Fetch initial messages on page load
document.addEventListener('DOMContentLoaded', fetchMessages);
