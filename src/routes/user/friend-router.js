const express = require('express')

const FriendService = require('./friend-service')

const FriendRouter = express.Router()
const jsonBodyParser = express.json()

FriendRouter
    .post('/post/friendrequest/:id',jsonBodyParser, (req,res,next) => {
        //id is user id making the request
        const { id } = req.params
        //should already have the friend id
        const { friend_id, accepted, declined } = req.body

        const newRequest = {
            user_id: id,
            sent_request_to: friend_id,
            accepted,
            declined
        }
        console.log('newRequest', newRequest)
        const userRequest = FriendService.insertFriendReq(
            req.app.get('db'),
            newRequest
        )
        res.status(201)
            .json(FriendService.serializeRequset(userRequest))


            next()
    })

FriendRouter
    .get('/get/friendid/:email',jsonBodyParser, async (req,res,next) => {
        const { email } = req.params
        console.log('friend email',email)
        //get riends id by checking if he exists by email
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