drop table if exists restaurant_type;
create table restaurant_type(
type_id bigserial primary key,
type_name text not null
);

DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "name" TEXT NOT NULL
);

drop table if exists "table";
create table "table"(
table_id bigserial primary key,
r_id bigint references restaurant(id),
table_size integer not null,
table_available bool default true
);


DROP TABLE IF EXISTS restaurant;
create table restaurant(
id bigserial primary key,
r_name text not null,
r_adress text not null,
r_phone text not null,
r_type bigint references restaurant_type(type_id),
user_id bigint references "user"(id)
);

DROP TABLE IF EXISTS "reservation";
CREATE TABLE "reservation" (
id bigserial primary key,
user_id bigint references "user"(id),
restaurant_id bigint references "restaurant"(id),
res_from timestamp not null,
res_to timestamp not null,
number_of_ppl int not null
);

ALTER TABLE "user"
ADD COLUMN user_type text;

alter table reservation
add column t_id bigint references "table"(table_id)

alter table "table"
add column t_name text