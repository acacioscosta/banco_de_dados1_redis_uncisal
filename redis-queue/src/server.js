const express = require('express')
const Queue = require('./config/queue')

const app = express()
app.use(express.json())

const { processPositions } = require('./process-positions')
const sendEmail = require('./background-mail')

app.post('/positions', processPositions)
Queue.process(sendEmail.handle)

app.listen(3000, console.log('Server ON at port: 3000'))