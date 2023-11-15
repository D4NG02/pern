import { Pool } from "pg";

const pool = new Pool({
    user: 'postgres',
    password: 'BadrulI2021',
    host: 'localhost',
    port: 5432,
    database: 'currency'
})

export default pool