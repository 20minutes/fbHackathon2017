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
  speech: String,
  link: String,
  status: String,
  date: Date,
  meta: [],
  source: String
})

var Fakenews = mongoose.model('Fakenews', fakenewsSchema)

server.post('/fakenews', function create(req, res, next) {

  var news = new Fakenews({ 
    speech: req.body.result.speech,
    link: req.body.result.parameters.url,
    status: 'new',
    date: req.body.timestamp,
    meta: [],
    source: null,
  })

  news.save(function (err, news) {
    if (err) return console.error(err)
  })

  res.send(200, `{
"speech": "Barack Hussein Obama II is the 44th and current President of the United States.",
"displayText": "Barack Hussein Obama II is the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University   and Harvard Law School, where ",
"data": {...},
"contextOut": [...],
"source": "DuckDuckGo"
}`)
  return next()
})

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
