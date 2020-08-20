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

    DateRouter
        .get('/get/lastestentry/:id',jsonBodyParser, async(req,res,next)=> {
            const { id } = req.params
            console.log('last id',id)
            await DateService.getLastEntry(
                req.app.get('db'),
                id
            )
            .then(result => {
                res.json(result)
            })
            
        })

    module.exports = DateRouter