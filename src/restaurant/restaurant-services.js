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
    findTable(db,r_type,party_size,from,to){
        return db
        .raw(`select * from "table" t 
        join restaurant r2 on r2.id = t.r_id
        where table_id not in(
        select r.t_id from reservation r
        where res_from >= '${from}' and res_to <= '${to}'
        ) and r2.r_type = ${r_type} and t.table_size <=${party_size+1} and t.table_size>=${party_size}`)
    },
    makeReservation(db,newReservation){
        return db
        .insert(newReservation)
        .into('reservation')
        .returning('*')
        .then(rows=>{
            return rows[0]
        }) 
    },
    myReservations(db,user_id){
        return db
        .raw(`select r.id,r.user_id,r.restaurant_id,r.res_from,r.res_to,r.number_of_ppl,r.t_id,r2.r_name,r2.r_adress,r2.r_phone from reservation r
        join restaurant r2 on r2.id = r.restaurant_id
        where r.user_id = ${user_id}`)
    },
    adminReservations(db,r_id){
        return db
        .raw(`select r.res_from,r.res_to,r.number_of_ppl,t.table_id,t.t_name,t.table_available,u2."name" from reservation r 
        left join "table" t on r.t_id = t.table_id
        join "user" u2 on u2.id = r.user_id 
        where r.restaurant_id = ${r_id}
        order by r.res_from `)
    }
}
module.exports = restaurantServices