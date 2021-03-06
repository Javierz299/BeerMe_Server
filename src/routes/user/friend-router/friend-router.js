const express = require('express')

const FriendService = require('./friend-service')

const FriendRouter = express.Router()
const jsonBodyParser = express.json()

FriendRouter
    .post('/post/friendrequest/',jsonBodyParser, async (req,res,next) => {
        //id is user id making the request
        //should already have the friend id
        const { user_id, friend_id } = req.body
        const newRequest = {
            user_id,
            sent_request_to: friend_id,
        }
        const userRequest = await FriendService.insertFriendReq(
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
            if(!result){
                res.status(404).send({
                    error: 'something went wrong getting friend requests'
                })
            }
            res.json(result)
        })
        
    })
FriendRouter
    .patch('/patch/addfriend/:id',jsonBodyParser, (req,res,next) => {
        const { id } = req.params
        const { sent_request_to } = req.body
        FriendService.patchAcceptRequest(
            req.app.get('db'),
            parseInt(id),
            sent_request_to,
        )
       .then(res => console.log('res',res))
            res.status(204).end()
     
    })
FriendRouter
    .patch('/patch/declinefriend/:id',jsonBodyParser, (req,res,next) => {
        const { id } = req.params
        const { sent_request_to } = req.body
        FriendService.patchDeclineRequest(
            req.app.get('db'),
            parseInt(id),
            sent_request_to,
        )
       .then(result => res.status(204).end())
     
    })
FriendRouter
    .get('/get/following/:id',jsonBodyParser,(req,res,next) => {
        const { id } = req.params

        FriendService.getFollowing(
            req.app.get('db'),
            id
        )
        .then(result => {
            if(!result){
                return {message: 'not following anyone yet'}
            } 
            res.json(result)
        })
    })


module.exports = FriendRouter