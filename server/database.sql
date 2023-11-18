CREATE DATABASE currency;

CREATE TABLE users(
    user_id INTEGER UNIQUE,
    username VARCHAR(50),
    password VARCHAR(100),
    position VARCHAR(50),
    country VARCHAR(50)
);

-- Fake user body reg
-- {
--     "user_id": 2021232532,
--     "username": "Badrul",
--     "password": "12345678",
--     "position": "Engineer",
--     "country": "Malaysia"
-- }


-- Fake user body login
-- {
--     "user_id": 2021232532,
--     "password": "12345678"
-- }

CREATE TABLE currencytable(
    table_id SERIAL PRIMARY KEY,
    country VARCHAR(255),
    value INTEGER
);

CREATE TABLE event(
    event_id SERIAL PRIMARY KEY,
    date VARCHAR(100),
    title VARCHAR(100),
    note VARCHAR(250),
    priority INTEGER
);