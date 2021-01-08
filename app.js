const express = require('express')
const app = express()
const port = 3000
var scrape = require('./router/index');
// app.get('/', (req, res) => res.send('Hello World!'))

app.use('/save-file', scrape);
const server = app.listen(port, () => console.log(`Scrape bbb script running in port: ${port}!`))
server.timeout = 24000000000;  

