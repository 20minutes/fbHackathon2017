var restify = require('restify');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/hackathon')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connection established !')
})

var server = restify.createServer()

server.use(restify.bodyParser({ mapParams: false }))

var fakenewsSchema = mongoose.Schema({
    test: String
});
var Fakenews = mongoose.model('Fakenews', fakenewsSchema)


server.post('/fakenews', function create(req, res, next) {
  var news = new Fakenews({ test: 'test' })
  res.send(201, req.body);
  return next();
})

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
