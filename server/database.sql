CREATE DATABASE currency;

-- For login & register
CREATE TABLE users(
    user_id INTEGER UNIQUE,
    username VARCHAR(50),
    password VARCHAR(100),
    position VARCHAR(50),
    country VARCHAR(50)
);

-- For currency task
CREATE TABLE currencytable(
    table_id SERIAL PRIMARY KEY,
    country VARCHAR(255),
    value INTEGER
);

-- For Event task
CREATE TABLE event(
    event_id SERIAL PRIMARY KEY,
    date VARCHAR(100),
    title VARCHAR(100),
    note VARCHAR(250),
    priority INTEGER
);


-- For Machine utilize
CREATE TABLE sites(
    site_id SERIAL PRIMARY KEY,
    site_name VARCHAR(100)
);

CREATE TABLE plants(
    plant_id SERIAL PRIMARY KEY,
    plant_name VARCHAR(100),
    site_id INTEGER REFERENCES sites(site_id)
);

CREATE TABLE departments(
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100),
    plant_id INTEGER REFERENCES plants(plant_id)
);

CREATE TABLE workcenters(
    workcenter_id SERIAL PRIMARY KEY,
    workcenter_name VARCHAR(100),
    department_id INTEGER REFERENCES departments(department_id)
);

CREATE TABLE workstations(
    workstation_id SERIAL PRIMARY KEY,
    workstation_name VARCHAR(100),
    workcenter_id INTEGER REFERENCES workcenters(workcenter_id)
);

CREATE TABLE assets(
    asset_id SERIAL PRIMARY KEY,
    asset_number INTEGER,
    asset_name VARCHAR(100),
    image_path VARCHAR(255),
    workstation_id INTEGER REFERENCES workstations(workstation_id)
);

CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY,
    timestamp VARCHAR(255),
    asset_id INTEGER REFERENCES assets(asset_id)
);
INSERT INTO transactions (timestamp, asset_id) VALUES ('20/5/2021 0:48', 3);
SELECT * FROM transactions