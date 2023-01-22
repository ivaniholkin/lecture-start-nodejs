const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();


router.get('/',
    function (req,res,next){
        const result = FighterService.getAll()
        res.send(result)

    })

router.get('/:id',
    function (req,res,next){
        const UserId = req.params.id
        const result = FighterService.search({id:UserId})
        if(result) {
            res.send(result)
        }else {
            res.status(404).send("Fighter not found")
        }
    })


router.post('/',
    createFighterValid,
    function (req,res,next){

        const result = FighterService.create(req.body)
        if (result) {
            res.status(200).send(result)
        }else {
            res.status(400).send("Fighter exist")

        }
    })

router.put('/:id',
    updateFighterValid,
    function (req,res,next){

        const result = FighterService.update(req.params.id,req.body)

        if(result) {
            res.send(result)
        }else {
            res.status(404).send("Fighter not found")
        }

    })

router.delete('/:id',
    function (req,res,next){

        res.send(FighterService.delete(req.params.id))

    })

module.exports = router;