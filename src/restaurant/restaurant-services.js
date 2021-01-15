const restaurantServices = {
    getRestaurant(db,user_id){
        return db
        .from('restaurant')
        .select(
            'id',
            'r_name',
            'r_adress',
            'r_phone',
            'r_type'
        )
        .where('user_id',user_id)
        .first()
    },
    getTypes(db){
        return db
        .from('restaurant_type')
        .select(
            'type_id',
            'type_name'
        )
    },
    updateRestaurant(db,newRestaurant,id){
        return db('restaurant')
        .where('id',id)
        .update(newRestaurant)
    },
}
module.exports = restaurantServices