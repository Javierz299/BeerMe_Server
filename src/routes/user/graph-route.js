const express = require('express')

const GraphService = require('./graph-service')

const GraphRouter = express.Router()
const jsonbBodyParser = express.json()

GraphRouter
    .get('/get/alluserdata', jsonbBodyParser, async (req,res,next) => {
    
        await GraphService.getAllUserData(
            req.app.get('db')
        )
        // .then(result => {
        //     console.log('graph data',result)
        // })

    })

module.exports = GraphRouter