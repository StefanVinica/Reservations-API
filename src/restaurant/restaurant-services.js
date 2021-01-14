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
}
module.exports = restaurantServices;