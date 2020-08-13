const express = requires = require('express')

const DrinkService = require('./drink-service')

const DrinkRouter = express.Router()
const jsonBodyParser = express.json()

DrinkRouter
    .post('/post/userdrink',jsonBodyParser, (req,res,next) => {
        const { user_id, beer, wine, shots, cocktail, date } = req.body

        const beerMe = {
            user_id,
            beer,
            wine,
            shots,
            cocktail,
            date,
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
                if(!result){
                    console.log('no result??')
                    res.status(404).send({
                        error: 'drinks not found'
                    })
                }
                res.json(result)
            })
    })


module.exports = DrinkRouter