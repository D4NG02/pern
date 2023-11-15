CREATE DATABASE currency;

CREATE TABLE currencytable(
    table_id SERIAL PRIMARY KEY,
    country VARCHAR(255),
    value INTEGER
);