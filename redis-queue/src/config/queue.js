const Queue     = require('bull')
const { redis } = require('./config.json')

const backgroundMail = require('../background-mail')

const mailQueue = new Queue(backgroundMail.key, redis)

module.exports = mailQueue