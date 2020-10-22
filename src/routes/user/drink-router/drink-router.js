const express = requires = require('express')

const DrinkService = require('./drink-service')

const DrinkRouter = express.Router()
const jsonBodyParser = express.json()

DrinkRouter
    .post('/post/userdrink',jsonBodyParser, (req,res,next) => {
        const { user_id, beer, 
                wine, shots, 
                cocktail, date,
                seltzer, craft_beer } = req.body

        const beerMe = {
            user_id, beer,
            wine, shots,
            cocktail, date,
            seltzer, craft_beer,
        }
         
        const drink = DrinkService.insertDrink(
            req.app.get('db'),
            beerMe
        )

        res.status(201)
            .json(DrinkService.serializeDrink(drink))

        next()
    })
DrinkRouter
    .get('/get/userdrink/:id',jsonBodyParser, async(req,res,next) => {
        const { id } = req.params

        await DrinkService.getUserDrink(
            req.app.get('db'),
            id
            )
            .then(result => {
                res.json(result)
            })
    })

DrinkRouter
    .patch('/patch/userdrink/:id',jsonBodyParser, (req,res,next) => {
        const { beer, wine, shots, cocktail, seltzer, craft_beer } = req.body

        const patchDrink = { beer, wine, shots, cocktail, seltzer, craft_beer}
        let keysAndValues = Object.entries(patchDrink)
        //possible values of being undefined. so filter
        //through and make object with valid values
        let validDrink = {}

        keysAndValues.forEach((ele) => {
            let num = ele[1]
           console.log('nums',num)
           if(ele){
            validDrink[ele[0]] = num
           } else {
               console.log('undefinded')
           }
        })

        DrinkService.patchUserDrink(
            req.app.get('db'),
            req.params.id,
            validDrink
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        
        
        
    })


module.exports = DrinkRouter