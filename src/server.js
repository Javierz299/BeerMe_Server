const app = require('./app')
require('dotenv').config()

const knex = require('knex')

require('dotenv').config()

const { PORT, DATABASE_URL } = require('./config')

app.use((error,req,res,next) => {
    let response

    if(process.env.NODE_ENV === 'production'){
        response = { error: {message: 'server error'}}
    } else {
        respone = { error }
    }
    res.status(500).json(response)
})

const db = knex({
    client:  'pg',
    connection: {
        host: 'ec2-54-158-222-248.compute-1.amazonaws.com',
        user: 'zhmuaqrwefkroh',
        password: '5e0f73de7cebce078454a97f9844661bd9c660e53830c904497932216c70e9dd',
        database: 'd1hjs1gv0g24m2'
    }
})

// const db = knex({
//     client:  'pg',
//     connection: DATABASE_URL,
// })

app.set('db',db)

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})