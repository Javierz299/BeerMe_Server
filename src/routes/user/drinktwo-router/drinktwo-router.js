const express = requires = require('express')

const DrinkTwoService = require('./drinktwo-service')

const DrinkTwoRouter = express.Router()
const jsonBodyParser = express.json()

DrinkTwoRouter
    .post('/post/userDrinkTwo',jsonBodyParser, (req,res,next) => {
        console.log("POST REACHED")
        const { user_id, duce, 
                eight_n_up, beer_bong, 
                shotgun, wine_flight, beer_flight } = req.body

        const beerMeTwo = {
            user_id, duce,
            eight_n_up, beer_bong,
            shotgun, wine_flight, beer_flight,
        }
         //console.log('beermeTwo',beerMeTwo)
        const drink = DrinkTwoService.insertDrinkTwo(
            req.app.get('db'),
            beerMeTwo
        )

        res.status(201)
            .json(DrinkTwoService.serializeDrinkTwo(drink))

        next()
    })
DrinkTwoRouter
    .get('/get/userDrinkTwo/:id',jsonBodyParser, async(req,res,next) => {
        const { id } = req.params
        console.log('get user drink two',id)

        await DrinkTwoService.getUserDrinkTwo(
            req.app.get('db'),
            id
            )
            .then(result => {
                console.log("userdrinktwo result",result)
                res.json(result)
            })
    })

DrinkTwoRouter
    .patch('/patch/userDrinkTwo/:id',jsonBodyParser, (req,res,next) => {
        const { duce, eight_n_up, beer_bong, shotgun, wine_flight, beer_flight } = req.body

        const patchDrinkTwo = { duce, eight_n_up, beer_bong, shotgun, wine_flight, beer_flight}
        console.log('patch',patchDrinkTwo)
        let keysAndValues = Object.entries(patchDrinkTwo)
        //possible values of being undefined. so filter
        //through and make object with valid values
        let validDrinkTwo = {}

        //console.log('id',id)
        //console.log('patchDrinkTwo',keysAndValues)
        keysAndValues.forEach((ele) => {
            let num = ele[1]
           console.log('nums',num)
           if(ele){
               if(ele[0] === "duce" && num === 1 || ele[0] === "eight_n_up" && num === 1){
                console.log('num',num + 1)
                validDrinkTwo[ele[0]] = num + 1
               } else {
                validDrinkTwo[ele[0]] = num
               }
           } else {
               console.log('ele undefinded, drinktworouter')
           }
        })
        console.log('validDrinkTwo',validDrinkTwo)

        DrinkTwoService.patchUserDrinkTwo(
            req.app.get('db'),
            req.params.id,
            validDrinkTwo
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
    })


module.exports = DrinkTwoRouter