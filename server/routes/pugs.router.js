const router = require('express').Router()
const {Pug} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!

router.get('/', async (req, res) => {
    try {
        const pug = await Pug.findAll();
        res.send(pug)
    } catch (error) {
        res.sendStatus(500);
    }
})

router.get('/favoriteCoffee/:favoriteCoffeeName', async (req, res) => {
    try {
        const pug = await Pug.findByCoffee(req.params.favoriteCoffeeName)
        // const pug = await Pug.findByFavoriteCoffeeId(req.params.favoriteCoffeeName.id)
        // console.log(pug[0].dataValues)
        res.send(pug)
    } catch (error) {
        res.sendStatus(500);
    }
})

router.get('/:pugId', async(req, res) => {
    try {
        const pug = await Pug.findOne({
            where:{
                id:req.params.pugId
            }
        })
        if(pug) {
            res.send(pug)
        } else {
            res.sendStatus(404)
            // res.status(404).send('error')  ---- both works!
        }       
    } catch (error) {
        res.sendStatus(500);
    }
})

router.post('/', async (req, res) => {
    const pug = await Pug.create(req.body)
    res.status(201).send(pug)
})

router.put('/:pudId', async (req, res) => {
    const pug = await Pug.findOne({
        where:{
            id: req.params.pudId
        }
    })
    if(!pug) {
        res.sendStatus(404)
    } else {
        await pug.update({favoriteCoffeeId: req.body.favoriteCoffeeId});
        res.send(pug)
    }
})

router.delete('/:pugId', async (req, res) => {
    //solution code pls!!!
    const pug = await Pug.findOne({
        where:{
            id: req.params.pugId
        }
    })
    if (!pug) {
        res.sendStatus(404)
    } else {
        await Pug.destroy({
            where:{
                id: req.params.pugId
            }
        })
        res.sendStatus(204)
    }
})


module.exports = router
