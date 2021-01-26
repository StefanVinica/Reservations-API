const bcrypt = require('bcryptjs')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Happy Paths', function () {
    let db

    const testUsers = helpers.makeUsersArray()
    const testTypes = helpers.makeTypesArray()
    const testRestaurants = helpers.makeRestaurantArray()
    const testTables = helpers.makeTableArray()
    const testReservations = helpers.makeReservationArray()



    before('make knex instance', () => {
        db = helpers.makeKnexInstance()
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())
    before('seed', () => helpers.seed(db,testUsers,testTypes,testRestaurants,testTables,testReservations))

    // before('cleanup', () => helpers.cleanTables(db))

    // afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /user`, () => {


        it(`responds with 200`, () => {
            return supertest(app)
                .get(`/api/user`)
                .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
                .expect(200)
        })

    })

    describe(`GET /info`, () => {
        it(`responds with 200`, () => {
            return supertest(app)
                .get(`/api/info`)
                .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
                .expect(200)
        })

    })

    describe(`GET /info/type`, () => {
        it(`responds with 200`, () => {
            return supertest(app)
                .get(`/api/info/type`)
                .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
                .expect(200)
        })

    })

    describe(`GET /myres`, () => {
        it(`responds with 200`, () => {
            return supertest(app)
                .get(`/api/myres`)
                .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
                .expect(200)
        })
    })

    describe(`GET /adminres/:r_id`, () => {
        it(`responds with 200`, () => {
            return supertest(app)
                .get(`/api/adminres/${1}`)
                .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
                .expect(200)
        })
    })

    describe(`PATCH /info/:id`, () => {
        it(`responds with 200`, () => {
            return supertest(app)
                .get(`/api/info/${1}`)
                .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
                .send(testRestaurants)
                .expect(404)
        })
    })

    describe(`PATCH /tablesize/:table_id`, () => {
        it(`responds with 200`, () => {
            return supertest(app)
                .get(`/api/tablesize/${2}`)
                .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
                .send(testTables)
                .expect(404)
        })
    })

    describe(`DELETE /reservation/:id`, () => {
        it(`responds with 200`, () => {
            return supertest(app)
                .delete(`/api//reservation/1`)
                .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
                .expect(204)
        })
    })

    describe(`POST /reservation`, () => {
        const newReservation = {
            user_id:1,
            id: 1,
            res_from: '2021-01-21T02:09:00.000Z',
            res_to: '2021-01-21T04:09:00.000Z',
            number_of_ppl: 2,
            table_id: 1,
        }
        
        it(`responds with 200`, () => {
            return supertest(app)
                .post(`/api/reservation`)
                .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
                .send(newReservation)
                .expect(200)
        })
    })    
       
})  