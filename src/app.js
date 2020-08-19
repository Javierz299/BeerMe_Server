const express = require('express')

const UserRouter = require('./routes/user/user-router')
const DrinkRouter = require('../src/routes/user/drink-router')
const DateRouter = require('./routes/user/date-router')

require('dotenv').config()

const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const { NODE_ENV } = require('./config')

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common'

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api',UserRouter)
app.use('/api',DrinkRouter)
app.use('/api',DateRouter)


module.exports = app