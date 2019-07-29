const express = require('express');
const app = express();

app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile(__dirname + '/views/index.html');
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/views/login.html');
});
app.listen(1337, function () {
    console.log('server is running at 127.0.0.1:1337');
});