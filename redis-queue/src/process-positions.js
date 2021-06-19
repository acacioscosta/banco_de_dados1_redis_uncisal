const Queue = require('./config/queue')
const mail  = require('./config/mail')

const vehicles = ['ABC-1234', 'NMK-6972', 'RGQ-2H66', 'ORE-0986', 'BDC-0987']
const address  = [
    'RUA MANOEL LOURENÇO',
    'RUA JOSÉ MAIA GOMES',
    'AVENIDA CECÍLIA CÂNDIDA DA SILVA',
    'RUA PEDRO CAVALCANTE',
    'AVENIDA DA PAZ'
]

const random = () => Math.floor(Math.random() * 4)

const processPositions = async (req, res) => {
    const { positions, useQueue } = req.body

    const sendWithQueue = async () => {
        for (const item of positions) {
            await Queue.add({
                ...item,
                vehicle : vehicles[random()],
                location: address[random()]
            })

            console.log(`E-mail para ${item.client} adicionado na fila`)
        }
    }

    const sendWithoutQueue = async () => {
        for (const item of positions) {
            await mail.sendMail({
                from   : 'Queue Test <queue@queue.com>',
                to     : `${item.client} "<"${item.email}>`,
                subject: 'Fila REDIS',
                html   : `Veículo ${vehicles[random()]} posicionado em ${address[random()]}`
            })

            console.log(`Enviado e-mail SEM fila para ${item.client}`)
        }
    }

    useQueue
        ? await sendWithQueue()
        : await sendWithoutQueue()

    return res.json({ message: 'Ok' })
}

module.exports = { processPositions }