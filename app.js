var express = require('express');
var app = express();
var ms = require('mongoskin')
var ObjectId = require('mongodb').ObjectID
var db = ms.db('mongodb://localhost:27017/pairgramming');

app.set('view engine', 'jade');
app.set('views', './views')

app.get('/user/:id', function (req, res) {
    db.collection('users').find({'_id':ObjectId(req.params.id)}).toArray(function(err, docs){
        if(err) throw err;

        if(docs.length <= 0) {
            res.sendStatus(404);
        }else {
            res.render('profile', docs[0]);
        }
    }); 
});
app.use(express.static('static'))

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
