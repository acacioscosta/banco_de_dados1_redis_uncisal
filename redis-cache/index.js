(async () => {

    const redis       = require('promise-redis')()
    const redisClient = redis.createClient()
    const mysql       = require('mysql2/promise')
    const conn        = await mysql.createConnection('mysql://root:root1234@localhost:3306/redis_cache')
    const board       = 'CAJ-3450'
    const amountLoop  = 1000

    console.time('no_cache')
    for (let count = 0; count < amountLoop; count++) {
        const [rows] = await conn.query('SELECT * FROM vehicles WHERE board = ? limit 1', [board])
    }
    console.timeEnd('no_cache')

    console.log('----------------------------------------------------')

    console.time('cache')
    for (let count = 0; count < amountLoop; count++) {
        let vehicleCache = await redisClient.get(board)

        if (vehicleCache) {
            if (count < 5) {
                console.log('CACHE => ', vehicleCache)
            }
        } else {
            const [rows] = await conn.query('SELECT * FROM vehicles WHERE board = ? limit 1', [board])
    
            redisClient.set(board, JSON.stringify(rows[0]), 'EX', 60)
    
            console.log('NO CACHE', rows[0])
        }
    }
    console.log('')
    console.timeEnd('cache')

})()