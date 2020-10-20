const express = require('express')

const UserRouter = require('./routes/user/user-router')
const DrinkRouter = require('./routes/user/drink-router/drink-router')
const DateRouter = require('./routes/user/date-router/date-router')
const FriendRouter = require('./routes/user/friend-router/friend-router')
const GraphRouter = require('./routes/user/graph-router/graph-route')
const CheersRouter = require('./routes/user/cheers-router/cheers-router')

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
app.use('/api',FriendRouter)
app.use('/api',GraphRouter)
app.use('/api',CheersRouter)



module.exports = app