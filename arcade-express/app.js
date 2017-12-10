var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var test = require('./routes/test');
var user = require('./routes/user');

http.listen(3002, function(){
  console.log('listening on *:3002');
});

var toConnect = undefined;
io.on('connection', function(socket){
  if(toConnect === undefined){
    console.log(socket.id + 'connected with nobody waiting for game');
    toConnect = socket.id;
  }
  else{
    console.log(socket.id + ' and ' + toConnect + ' are now playing');
    socket.broadcast.to(toConnect).emit('user_connected', {id: socket.id, first: true});
    io.to(socket.id).emit('user_connected', {id: toConnect, first: false});
    toConnect = undefined;
  }
  socket.on('new_move', function(data){
    socket.broadcast.to(data.player).emit('new_move', data.square);
  })
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', test);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
