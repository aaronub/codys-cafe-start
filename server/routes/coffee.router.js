const router = require('express').Router()
// const { noExtendLeft } = require('sequelize/types/lib/operators')
const {Coffee} = require('../models')
const { findByIngredient } = require('../models/coffee.model')

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!

router.get('/', async(req, res) => {
    try {
        const coffee = await Coffee.findAll()
        res.send(coffee)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.get('/ingredients/:ingredientName', async(req, res) => {
    try {
        //???
        const coffees = await Coffee.findByIngredient(req.params.ingredientName);
        res.send(coffees)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.get('/:coffeeID', async(req, res)=> {
    try {
        const coffee = await Coffee.findOne({
            where: {
                id: req.params.coffeeID
            }
        })
        // Following also works!!!!
        // const coffee = await Coffee.findByPk(req.params.coffeeID)
        if(coffee) {
            res.send(coffee)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post ('/', async(req,res, next) => {
    try {
       const coffee = await Coffee.create(req.body)
        res.status(201).send(coffee)  
    } catch (error) {
        // res.sendStatus(500)
        next(error);
    }
})

// router.get('/ingredients/:ingredientName', async(req,res)=>{
//     const coffees = await Coffee.findAll()
//     console.log(coffees)
//     const matches =  coffees.filter(elem => elem.ingredients.includes(req.params.ingredientName))
//     res.send(matches)
// })
// router.get('/ingredients/:ingredientName',  async (req, res) => {
//     try {
//         const coffees =  await Coffee.findByIngredient(req.params.ingredientName);
//         res.send(coffees)       
//     } catch (error) {
//         res.sendStatus
//     }
// })
// router.get('/:coffeeId', async (req, res) => {
//     //always an array=========
//     // const coffee = await Coffee.findAll({
//     //     where:{
//     //         id: req.params.coffeeId
//     //     }
//     // })
//     // if (coffee[0]) {
//     //     res.send(coffee[0])       
//     // } else {
//     //     res.sendStatus(404)
//     // }

//     //either the {foundrow...} or Null============
//     const coffee = await Coffee.findOne({
//         where:{
//             id: req.params.coffeeId
//         }
//     })
//     console.log(coffee)
//     if(coffee){
//         res.send(coffee)
//     } else {
//         res.sendStatus(404)
//     }
// })
// router.post ('/', async(req, res)=>{
//     try {
//         const coffee = await Coffee.create(req.body)
//         res.status(201).send(coffee)
//     } catch (error) {
//         res.sendStatus(500)
//     }
// })

module.exports = router
