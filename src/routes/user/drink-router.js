const express = requires = require('express')

const DrinkService = require('./drink-service')
const config = require('../../config')

const DrinkRouter = express.Router()
const jsonBodyParser = express.json()

DrinkRouter
    .post('/post/userdrink',jsonBodyParser, (req,res,next) => {
        console.log("drink post req",req.body)
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
                console.log(result)
                // if(!result){
                //     console.log('no result??')
                //     res.status(404).send({
                //         error: 'drinks not found'
                //     })
                //}
                res.json(result)
            })
    })

DrinkRouter
    .patch('/patch/userdrink/:id',jsonBodyParser, (req,res,next) => {
        const { id } = req.params
        const { beer, wine, shots, cocktail } = req.body

        const patchDrink = { beer, wine, shots, cocktail}
        let keysAndValues = Object.entries(patchDrink)
        // if(beer.beer !== undefined){

        let validDrink = {
            user_id: id
        }

        console.log('id',id)
        console.log('patchDrink',keysAndValues)
        keysAndValues.forEach((ele,i) => {
            let num = ele[1]
           console.log('nums',num)
           let type = typeof num
           console.log('type',type)
           if(type === 'number'){
            validDrink[ele[0]] = num
           } else {
               console.log('undefinded')
           }
        })
        
        console.log('validDrink',validDrink)
    })


module.exports = DrinkRouter