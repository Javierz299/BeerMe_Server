const app = require('./app')

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

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})