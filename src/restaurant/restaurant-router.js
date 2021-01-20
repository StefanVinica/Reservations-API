const express = require("express");
const restaurantServices = require('./restaurant-services')
const { requireAuth } = require("../middleware/jwt-auth");

const restaurantRouter = express.Router()
const bodyParser = express.json()

restaurantRouter
.use(requireAuth)

restaurantRouter
.route('/info')
.get((req, res, next) => {
    restaurantServices.getRestaurant(req.app.get('db'),req.user.id)
    .then(restaurant => {
        res
        .status(200)
        .json(restaurant)
    })
    .catch(next)
})

restaurantRouter
.route('/user')
.get((req, res, next)=>{
    restaurantServices.getUserInfo(req.app.get('db'),req.user.id)
    .then(user => {
        res
        .status(200)
        .json(user)
    })
    .catch(next)
})

restaurantRouter
.route('/info/:id')
.patch(bodyParser,(req, res, next)=>{
    const { id } = req.params
    const {r_name, r_adress,r_phone,r_type} = req.body
    const newRestaurant = {r_name, r_adress,r_phone,r_type}
    restaurantServices.updateRestaurant(req.app.get('db'),newRestaurant,id)
    .then(
        res
        .status(204)
        .end()
    )
    .catch(next)
})


restaurantRouter
.route('/info/type')
.get((req,res, next) =>{
    restaurantServices.getTypes(req.app.get('db'))
    .then(type=>{
        res
        .status(200)
        .json(type)
    })
    .catch(next)
})

restaurantRouter
.route('/table/:id')
.post(bodyParser,(req,res,next)=>{
    const {id} = req.params
    const {table_size} = req.body
    const r_id = id
    const newTable = {r_id,table_size}

    restaurantServices.insertTable(req.app.get('db'),newTable)
    .then(table =>{
        res
        .status(201)
        .json(table)
    })
    .catch(next)
})
.get((req, res, next)=>{
    const {id} = req.params
    restaurantServices.getTables(req.app.get('db'),id)
    .then(tables => {
        res
        .status(200)
        .json(tables)
    })
    .catch(next)
})


module.exports = restaurantRouter