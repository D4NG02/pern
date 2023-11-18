CREATE DATABASE currency;

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