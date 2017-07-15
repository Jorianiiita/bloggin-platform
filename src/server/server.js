const express = require('express')
const app = express()
const path = require('path')
const PORT = 8001

//app.use('/static/build', function(req, res, next) { console.log('aaaaa'); next();})

//app.use('/static/build', express.static(path.join(__dirname + '/../../public/static/build')))

/*
app.get('/static/build/style.css', function(req, res) { 
  console.log('aaa')
  res.sendFile(path.join(__dirname + '/../../public/static/build/style.css'))
})
*/
app.get('*', function (req, res) {
  console.log('sdasda', req.url)
  if(req.url == '//static/build/style.css')
	res.sendFile(path.join(__dirname + '/../../public/static/build/style.css'))
  else if(req.url == '//static/build/bundle.js')
	res.sendFile(path.join(__dirname + '/../../public/static/build/bundle.js'))
  else
	res.sendFile(path.join(__dirname + '/../../public/index.html'))
})

app.listen(PORT, function () {
  console.log(`server is listening at port ${PORT}`)
})
