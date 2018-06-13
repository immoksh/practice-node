const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/../public'));

const port = process.env.port || 3000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
})