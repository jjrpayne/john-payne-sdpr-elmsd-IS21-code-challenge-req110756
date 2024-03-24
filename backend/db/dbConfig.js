const Pool = require('pg').Pool

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_SSL} = process.env;

// connect to database
const pool = new Pool({
    user: DB_USER || "postgres",
    host: DB_HOST || "localhost",
    password: DB_PASSWORD || "postgres",
    port: DB_PORT || 5432,
    database: DB_NAME || "paintingcodb",
    ssl: DB_SSL || true
});

// export function to query database
module.exports = {
    query: (text, values) => pool.query(text, values)
}