const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express ();

app.use(helmet());
app.use(cors({ orgin: process.env.CLIENT_URL, credentials: true}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sermons', require('./routes/sermons'));
app.use('/api/events', require('./routes/events'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sermons', require('./routes/sermons'));
app.use('/api/events', require('./routes/events'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/prayers', require('./routes/prayers'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sermons', require('./routes/sermons'));
app.use('/api/users', require('./routes/users'));
app.get('/'), (req, res) => res.json({ message: 'Welcome to the Sandringham Church API Running ' });

app.use ((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));