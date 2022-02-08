// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var strftime = require('strftime');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// giving headers for JSON
app.set({ 'Content-Type': 'application/json' }) 

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", function (req, res) {
  let date = new Date();
  res.json({
    unix: date.valueOf(),
    utc:  date.toUTCString()
  })
});


app.get('/api/:date', function(req, res){

  let date_params = req.params.date;  

  if(date_params.match(/\d{5,}/)){
    date_params = +date_params
  }

  let date = new Date(date_params);

  if(date.toString() === 'Invalid Date'){
    res.status(400).json({error: 'Invalid Date'});
  }
  res.json({unix: date.valueOf(), utc: date.toUTCString()});

})




// your first API endpoint... 




// listen for requests :)
var listener = app.listen(7070, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
