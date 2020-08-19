const express = require('express')

const DateService = require('./date-service')

const DateRouter = express.Router()
const jsonBodyParser = express.json()

DateRouter
    .post('/post/drinkdate/:id',jsonBodyParser, (req,res,next) => {
        console.log("date post",req.body)
        console.log('id',req.params)
        const { id } = req.params
        const { date } = req.body
        console.log('date',date)
        const postDate = {
            user_id: id,
            date,
        }

        const datePosted = DateService.insertDate(
            req.app.get('db'),
            postDate
        )

        res.status(201)
            .json(DateService.serializeDate(datePosted))
        
        next()
    })

    module.exports = DateRouter