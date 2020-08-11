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
        host: 'localhost',
        user: 'postgres',
        password: 'Tucker15!',
        database: 'Beer_Me'
    }
})

app.set('db',db)

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})