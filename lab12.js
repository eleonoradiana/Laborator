var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:"webtest"
});

var stmt="INSERT into chat_message (message) value {{mess}} "

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});


app.get('/', function(req, res){
  console.log(__dirname);
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){
  console.log('a user connected');

   socket.on('chat message', function(msg){
    io.emit('chat message', msg);
      
      stmt=`INSERT into chat_message (message) VALUES ('${msg}')`;
      console.log(stmt);
      con.query(stmt, function (err, result) {
          if (err) throw err;
          console.log( result);
        });
  });



  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});