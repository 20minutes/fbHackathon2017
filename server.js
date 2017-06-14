var restify = require('restify');

var server = restify.createServer();

server.use(restify.bodyParser({ mapParams: false }));

server.post('/fakenews', function create(req, res, next) {
   res.send(201, req.body);
   return next();
 });

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
