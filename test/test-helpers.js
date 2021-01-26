const knex = require('knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * create a knex instance connected to postgres
 * @returns {knex instance}
 */
function makeKnexInstance() {
  return knex({
    client: 'pg',
    connection: process.env.TEST_DB_URL,
  })
}

/**
 * create a knex instance connected to postgres
 * @returns {array} of user objects
 */
function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
      user_type: 'Admin',
    },
    {
      id: 2,
      username: 'test-user-2',
      name: 'Test user 2',
      password: 'password',
      user_type: 'User',
    },
  ]
}

/**
 * create a knex instance connected to postgres
 * @returns {array} of types objects
 */
function makeTypesArray() {
  return [
    {
      type_id: 1,
      type_name: 'Test-Type1',
    },
    {
      type_id: 2,
      type_name: 'Test-Type2',
    },
  ]
}

/**
 * create a knex instance connected to postgres
 * @returns {array} of restaurant objects
 */
function makeRestaurantArray() {
  return [
    {
      id: 1,
      r_name: 'Test 1',
      r_adress: 'Address 1',
      r_phone: '123321123',
      r_type: 1,
      user_id: 1,
    },
  ]
}

/**
 * create a knex instance connected to postgres
 * @returns {array} of table objects
 */
function makeTableArray() {
  return [
    {
      id: 1,
      r_id: 1,
      table_size: 2,
      table_available: true,
      t_name: 'test name',
    },
  ]
}

/**
 * create a knex instance connected to postgres
 * @returns {array} of Reservation objects
 */
function makeReservationArray() {
  return [
    {
      user_id: 1,
      restaurant_id: 1,
      res_from: '2021-01-21T02:09:00.000Z',
      res_to: '2021-01-21T04:09:00.000Z',
      number_of_ppl: 2,
      t_id:1,
    },
  ]
}

/**
 * make a bearer token with jwt for authorization header
 * @param {object} user - contains `id`, `username`
 * @param {string} secret - used to create the JWT
 * @returns {string} - for HTTP authorization header
 */
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

/**
 * remove data from tables and reset sequences for SERIAL id fields
 * @param {knex instance} db
 * @returns {Promise} - when tables are cleared
 */
function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        "reservation",
        "restaurant",
        "table",
        "user",
        "restaurant_type"`
      )
  )
}

/**
 * insert users into db with bcrypted passwords and update sequence
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @returns {Promise} - when users table seeded
 */
function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.transaction(async trx => {
    await trx.into('user').insert(preppedUsers)

    await trx.raw(
      `SELECT setval('user_id_seq', ?)`,
      [users[users.length - 1].id],
    )
  })
}


function seed(db,users,types,restaurant,table,reservation){
  return db
  .into('user')
  .insert(users)
.then(  
  db
  .into('restaurant_type')
  .insert(types))
.then(db
  .into('restaurant')
  .insert(restaurant))
.then(db
  .into('table')
  .insert(table)) 
.then(db
  .into('reservation')
  .insert(reservation))   
  
}

module.exports = {
  makeKnexInstance,
  makeUsersArray,
  makeTypesArray,
  makeRestaurantArray,
  makeAuthHeader,
  makeTableArray,
  makeReservationArray,
  cleanTables,
  seedUsers,
  seed,
}
