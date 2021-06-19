const mail = require('./config/mail')

const sendEmail = {
    key: 'positions',
    async handle({ data }) {
        const {
            client,
            email,
            vehicle,
            location
        } = data

        console.log(`Enviando e-mail da fila para ${client}`)

        await mail.sendMail({
            from   : 'Queue Test <queue@queue.com>',
            to     : `${client} "<"${email}>`,
            subject: 'Queue REDIS',
            html   : `Veículo ${vehicle} posicionado em ${location}`
        })
    }
}

module.exports = sendEmail