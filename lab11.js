const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'books'
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  connection.query("SELECT * FROM authors", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/post', (req,res)=>{
  connection.query("SELECT * FROM authors", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    });
  });



