const express = require('express')

const UserService = require('./user-service')

const UserRouter = express.Router()
const jsonBodyParser = express.json()

UserRouter
    .post('/',jsonBodyParser, async (req,res,next) => { // add new user to db
        const { email, full_name } = req.body
        
        const newUser = {
            full_name,
            email,
        }

        const user = await UserService.insertUser(
            req.app.get('db'),
            newUser
        )

        res.status(201)
           .json(UserService.serializeUser(user))

    
           next()

    })

    module.exports = UserRouter