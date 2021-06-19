const nodemailer   = require('nodemailer')
const { mailtrap } = require('./config.json')

const transport = nodemailer.createTransport(mailtrap)

module.exports = transport