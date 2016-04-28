var express = require('express');

var app = module.exports = express.createServer();

// Express 程序配置
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// url路由
app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.listen(8080);