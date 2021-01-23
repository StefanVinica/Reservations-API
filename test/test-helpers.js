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

// /**
//  * generate fixtures of languages and words for a given user
//  * @param {object} user - contains `id` property
//  * @returns {Array(languages, words)} - arrays of languages and words
//  */
// function makeLanguagesAndWords(user) {
//   const languages = [
//     {
//       id: 1,
//       name: 'Test language 1',
//       user_id: user.id,
//     },
//   ]

//   const words = [
//     {
//       id: 1,
//       original: 'original 1',
//       translation: 'translation 1',
//       language_id: 1,
//       next: 2,
//     },
//     {
//       id: 2,
//       original: 'original 2',
//       translation: 'translation 2',
//       language_id: 1,
//       next: 3,
//     },
//     {
//       id: 3,
//       original: 'original 3',
//       translation: 'translation 3',
//       language_id: 1,
//       next: 4,
//     },
//     {
//       id: 4,
//       original: 'original 4',
//       translation: 'translation 4',
//       language_id: 1,
//       next: 5,
//     },
//     {
//       id: 5,
//       original: 'original 5',
//       translation: 'translation 5',
//       language_id: 1,
//       next: null,
//     },
//   ]

//   return [languages, words]
// }

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

/**
 * seed the databases with words and update sequence counter
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @param {array} types - array of restaurant types objects for insertion
 * @returns {Promise} - when all tables seeded
 */
async function seedTypes(db, users, types) {
  await seedUsers(db, users)

  await db.transaction(async trx => {
    await trx.into('restaurant_type').insert(types)
    
  })
}

module.exports = {
  makeKnexInstance,
  makeUsersArray,
  makeTypesArray,
  makeAuthHeader,
  cleanTables,
  seedUsers,
  seedTypes,
}
