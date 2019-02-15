
const express = require('express')
const app = express()
const port = 3000

var fs = require('fs');

var request = require('request');



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(express.static('public'))



console.log('after calling readFile');


app.get('/readFile',(req, res)=>{
	fs.readFile('DATA.txt', 'utf8', function(err,contents){
		res.send(contents);
	});
});


app.get('/serverRead', (req, response) =>
	{
		request('http://jsonplaceholder.typicode.com/todos/', {json:true}, (error, res, body)=> {
  			if (error) {return console.log(error);}
  				console.log(body.url);
  				console.log(body.explanation);
  				response.send(body);
  					
		});
	});

