const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();


router.get('/',
    function (req,res,next){
    const result = UserService.getAll()
    res.send(result)

})

router.get('/:id',
    function (req,res,next){
        const UserId = req.params.id
        const result = UserService.search({id:UserId})
        if(result) {
            res.send(result)
        }else {
            res.status(404).send("User not found")
        }
    })


router.post('/',
    createUserValid,
    function (req,res,next){

        const result = UserService.create(req.body)
        if (result) {
            res.status(200).send(result)
        }else {
            res.status(400).send("User exist")

        }
    })

router.put('/:id',
    updateUserValid,
    function (req,res,next){

        const result =UserService.update(req.params.id,req.body)

        if(result) {
            res.send(result)
        }else {
            res.status(404).send("User not found")
        }

    })

router.delete('/:id',
    function (req,res,next){

        res.send(UserService.delete(req.params.id))

    })

module.exports = router;