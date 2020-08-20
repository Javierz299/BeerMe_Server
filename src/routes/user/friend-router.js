const express = require('express')

const FriendService = require('./friend-service')

const FriendRouter = express.Router()
const jsonBodyParser = expresss.json()

FriendRouter
    .post('/post/friendrequest/:id',jsonBodyParser, (req,res,next) => {
        const { id } = req.params
        const { user_id, friend_id, accepted, declined } = req.body

        const newRequest = {
            user_id,
            sent_request_to: friend_id,
            accepted,
            declined
        }
        console.log('newRequest', newRequest)
        const userRequest = FriendService.insertFriendReq(
            req.app.get('db'),
            userRequest
        )
        res.status(201)
            .json(FriendService.serializeRequset(userRequest))


            next()
    })

FriendRouter
    .get('/get/friendid',jsonBodyParser, async (req,res,next) => {
        { email } req.body
        console.log('friend email',email)
        //friends id by checking if he exists by email
        await FriendService.getFriendId(
            req.app.get('db'),
            email,
        )
        .then(result => {
            if(!result){
                console.log('no result/no user')
                res.status(404).send({
                    error: 'user not found'
                })
            }
            //send back friend id if found - use this id to then post
            res.json(result)
        })

    })


module.exports = FriendRouter