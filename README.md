# Reservation API!

# Routes

1. GET /info
2. GET /user
3. PATCH /info/:id
4. PATCH /tablesize/:table_id
5. GET /info/type
6. POST /table/:id
7. POST /find/:type/:party
8. POST /reservation
9. GET /myres
10. GET /adminres/:r_id
11. DELETE /reservation/:id

1. Returns information about the restaurant
2. Returns what kind of User it is
3. Edit the info of restaurant (where id is the restaurant ID)
   a. You must have r_name,r_adress,r_phone, and r_type of restaurant in the req body
4. Edit the Size of a table (where table_id is the table ID)
   a. You must have table_size in the req body
5. Returns the avilable types of restaurants
6. Add a new table (where id is the restaurant ID)
   a. You must have table_size and t_name in req body
7. Returns avilable table in the chosen time slot where type is the id of the type and party is the size of the party both
   a. You must have from and to in the req body (both JSON dates)
9. Returns the logged in users reservations
10. Returns all the reservations of the restaurant where r_id is the retaurant ID
11. Deletes a reservation where id is the reservation ID   

## Local dev setup

```bash
mv example.env .env
createdb -U "User" spaced-repetition
createdb -U "User" spaced-repetition-test
```

If your user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g  on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`
