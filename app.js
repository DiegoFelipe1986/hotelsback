// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

// Init vars
var app = express();
app.use(cors());

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Routes
var appRoutes = require('./routes/app');
var hotelRoutes = require('./routes/hotel');


// DB conection
mongoose.connection.openUri('mongodb://localhost:27017/hotelsDB', (err, res) => {
    if (err) throw err;
    console.log('Db: \x1b[32m%s\x1b[0m', 'online');
});

// Routes
app.use('/hotel', hotelRoutes);
app.use('/', appRoutes);

// Listening req
app.listen(3000, () => {
    console.log('Express en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});