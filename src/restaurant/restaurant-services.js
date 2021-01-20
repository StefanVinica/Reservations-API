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
    getTables(db,r_id){
        return db
        .from('table')
        .select('*')
        .where('r_id',r_id)
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
    insertTable(db,newTable){
        return db
        .insert(newTable)
        .into('table')
        .returning('*')
        .then(rows=>{
            return rows[0]
        })        
    },
    getUserInfo(db,user_id){
        return db
        .from('user')
        .select('user_type')
        .where('id',user_id)
        .first()
    }
}
module.exports = restaurantServices