const express = require('express')

const UserService = require('./user-service')

const UserRouter = express.Router()
const jsonBodyParser = express.json()

UserRouter
    .post('/post/userprofile',jsonBodyParser, (req,res,next) => { // add new user to db
        const { name, email, email_verified, } = req.body
        
        const newUser = {
            username: name,
            email,
            email_verified,
        }

        console.log(newUser)
        const user = UserService.insertUser(
            req.app.get('db'),
            newUser
        )
    
            res.status(201)
            .json(UserService.serializeUser(user))
 
            next()

})

UserRouter
    .get('/get/userprofile',(req,res,next) => {
        const { email } = String(req.body)
        UserService.getUserProfile(req.app.get('db'),email)
            .then(res => res)

    })

    module.exports = UserRouter