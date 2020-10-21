const express = requires = require('express')

const DrinkService = require('./drink-service')

const DrinkRouter = express.Router()
const jsonBodyParser = express.json()

DrinkRouter
    .post('/post/userdrink',jsonBodyParser, (req,res,next) => {
        console.log("drink post req",req.body)
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
         console.log('beerme',beerMe)
        console.log(beerMe)
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
        console.log('drinks params',id)

        await DrinkService.getUserDrink(
            req.app.get('db'),
            id
            )
            .then(result => {
                console.log("result",result)
                res.json(result)
            })
    })

DrinkRouter
    .patch('/patch/userdrink/:id',jsonBodyParser, (req,res,next) => {
        const { beer, wine, shots, cocktail, seltzer, craft_beer } = req.body

        const patchDrink = { beer, wine, shots, cocktail, seltzer, craft_beer}
        //console.log('patch route',patchDrink)
        let keysAndValues = Object.entries(patchDrink)
        //possible values of being undefined. so filter
        //through and make object with valid values
        let validDrink = {}

        //console.log('id',id)
        //console.log('patchDrink',keysAndValues)
        keysAndValues.forEach((ele) => {
            let num = ele[1]
           console.log('nums',num)
           if(ele){
               console.log('num',num)
            validDrink[ele[0]] = num
           } else {
               console.log('undefinded')
           }
        })
        console.log('validDrink',validDrink)

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