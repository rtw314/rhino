var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views')
app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});
app.use(express.static('static'))

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});