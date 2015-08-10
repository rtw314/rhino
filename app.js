var express = require('express');
var app = express();
var db = require('mongoskin').db('mongodb://localhost:27017/pairgramming');


db.collection('mamals').find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

app.set('view engine', 'jade');
app.set('views', './views')
app.get('/', function (req, res) {
    db.collection('users').find().toArray(function(err, docs){
        if(err) throw err;
        res.render('profile', docs[0]);
    }); 
});
app.use(express.static('static'))

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
