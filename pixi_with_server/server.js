var express = require('express'),
    app = express();

app.configure(function(){
    app.use('/js', express.static(__dirname+'/js'));
    app.use('/images', express.static(__dirname+'/images'));
});

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

var port = 5975;
app.listen(port);
console.log('File Server started on port %s', port);
