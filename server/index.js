const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
/*>>>>>>=============================================<<<<<<*/

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

const app = express();
const router = require('./router');

// App Setup

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup

const PORT = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server listening to port ${PORT}`);
});
