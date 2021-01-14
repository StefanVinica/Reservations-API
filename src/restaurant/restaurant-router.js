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

module.exports = restaurantRouter