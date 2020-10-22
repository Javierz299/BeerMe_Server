const express = require('express')

const CheersService = require('./cheers-service');
const { kMaxLength } = require('buffer');

const CheersRouter = express.Router()
const bodyParser = express.json()

CheersRouter
    .post('/post/sendCheers', bodyParser, async (req,res,next) => {
        const { user_id, sent_to} = req.body;
        const newCheers ={
            user_id,
            sent_to,
        };
        const cheersRequest = await CheersService.insertCheers(
            req.app.get('db'),
            newCheers,
        );
        res.status(201)
            .json(CheersService.serializeCheers(cheersRequest))

            next()
    });

CheersRouter
    .get('/get/allCheers/:id', bodyParser, async(req,res,next) => {
        const { id } = req.params;
        await CheersService.getCheers(
            req.app.get('db'),
            id,
        )
        .then(result => {
            console.log('cheers result',result)
            if(!result){
                res.status(404).send({
                    error: 'something went wrong getting cheers'
                })
            }
            res.json(result)      
        })
        
    });

CheersRouter
    .delete('/delete/cheers', bodyParser, (req,res,next) => {
        const { user_id, sent_to } = req.body

        const cheers = {
            user_id: user_id,
            sent_to: sent_to,
        }

        CheersService.deleteCheers(
            req.app.get('db'),
            cheers
            )
            .then(res => console.log('res',res))


    });

    module.exports = CheersRouter;