var express = require('express')
var app = express()
app.use(express.static('./dist/ziphr-coding-exam'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'ziphr-coding-exam/'}
);
});

app.listen(process.env.PORT || 8080);
