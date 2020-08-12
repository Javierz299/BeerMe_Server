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
    .get('/get/userprofile/:email', jsonBodyParser, async (req,res,next) => {
        const { email } = req.param
        console.log('req param',email)

    //    await UserService.getUserProfile(req.app.get('db'),email)
    //         .then(result => {
    //             if(!result){
    //                 console.log('no result??')
    //                 res.status(404).send({
    //                     error: 'user not found'
    //                 })
    //             }
    //             res.json(result)
    //         })

    })

    module.exports = UserRouter