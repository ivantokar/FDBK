require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , client = require('./routes/client')
    , contact = require('./routes/contact');

// App Init
let app = express()
    , port = process.env.PORT || 80;

// Static Assets
app.use(express.static('./build'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/contact', contact);
app.use('*', client);

app.listen(port);

console.log('Server started on '+ port +' port');