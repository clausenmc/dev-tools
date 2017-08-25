express = require('express')
bodyParser = require('body-parser')
path = require('path')
app = express()

app.use(express.static(path.join __dirname + '/../html/'));
app.use(express.static(path.join __dirname + '/../css/'));

app.listen 9293, ->
  console.log 'Server listening on port :9293!'
  console.log 'http://localhost:9293/'
  return