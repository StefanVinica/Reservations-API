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
.route('/tablesize/:table_id')
.patch(bodyParser,(req, res, next)=>{
    const {table_id} = req.params
    const {table_size} = req.body
    const newSize = {table_size}
    restaurantServices.updateTable(req.app.get('db'),newSize,table_id)
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
    const {table_size,t_name} = req.body
    const r_id = id
    const newTable = {r_id,table_size,t_name}

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

restaurantRouter
.route('/find/:type/:party')
.post(bodyParser,(req, res, next)=>{
    const {type,party} = req.params
    const {from,to} = req.body
    restaurantServices.findTable(req.app.get('db'),parseInt(type),parseInt(party),from,to)
    .then(tables=>{
        res
        .status(200)
        .json(tables.rows)
    })
    .catch(next)
})

restaurantRouter
.route('/reservation')
.post(bodyParser,(req, res, next)=>{
    const user_id = req.user.id
    const {restaurant_id,res_from,res_to,number_of_ppl,t_id} = req.body
    const newReservation = {user_id,restaurant_id,res_from,res_to,number_of_ppl,t_id}
    restaurantServices.makeReservation(req.app.get('db'),newReservation)
    .then(reservation => {
        res
        .status(200)
        .json(reservation)
    })
    .catch(next)
})

restaurantRouter
.route('/myres')
.get((req, res, next)=>{
    const user_id = req.user.id
    restaurantServices.myReservations(req.app.get('db'),user_id)
    .then(myres=>{
        res
        .status(200)
        .json(myres.rows)
    })
    .catch(next)
})

restaurantRouter
.route('/adminres/:r_id')
.get((req, res, next)=>{
    const {r_id} = req.params
    restaurantServices.adminReservations(req.app.get('db'),r_id)
    .then(reservations=>{
        res
        .status(200)
        .json(reservations.rows)
    })
    .catch(next)
})

restaurantRouter
.route('/reservation/:id')
.delete((req, res, next)=>{
    const {id} = req.params
    restaurantServices.deleteReservation(req.app.get('db'),id)
    .then(()=>{
        res
        .status(204)
        .end()
    })
    .catch(next)
})





module.exports = restaurantRouter