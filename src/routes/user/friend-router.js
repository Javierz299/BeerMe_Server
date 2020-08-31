const express = require('express')

const FriendService = require('./friend-service')

const FriendRouter = express.Router()
const jsonBodyParser = express.json()

FriendRouter
    .post('/post/friendrequest/',jsonBodyParser, (req,res,next) => {
        //id is user id making the request
        //should already have the friend id
        const { user_id, friend_id } = req.body
        console.log('friend id',friend_id,user_id)
        const newRequest = {
            user_id,
            sent_request_to: friend_id,
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
FriendRouter
    .get('/get/friendrequests/:id',jsonBodyParser, async (req,res,next) => {
        const { id } = req.params
        await FriendService.getRequests(
            req.app.get('db'),
            id,
        )
        .then(result => {
            console.log('result from friend request',result)
            if(!result){
                res.status(404).send({
                    error: 'something went wrong getting friend requests'
                })
            }
            res.json(result)
        })
        
    })

FriendRouter
    .get('/get/pendingrequests/:id',jsonBodyParser, async (req,res,next) => {
        const { id } = req.params

        await FriendService.getPendingUsernames(
            req.app.get('db'),
            id
        )
        .then(result => {
            if(!result){
                res.status(404).send({
                    error: 'something went wrong getting pending requests'
                })
            }
            res.json(result)
        })
    })


module.exports = FriendRouter