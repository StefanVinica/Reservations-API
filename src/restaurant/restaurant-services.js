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
    },
    findTable(db,r_type,party_size){
        return db
        .raw(`select t.table_id,t.r_id,t.table_size,r.r_name,r.r_type,r2.res_from,r2.res_to from "table" t
        join restaurant r on r.id=t.r_id
        left join reservation r2 on r2.t_id = t.table_id 
        where r.r_type = ${r_type} and t.table_size <=${party_size+1} and t.table_size>=${party_size}`)
    }
}
module.exports = restaurantServices