// const mysql = require('mysql2');
// require('dotenv').config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// }).promise(); // Enable promise-based queries

// module.exports = pool;




const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise(); // Enable promise-based queries

// Export the database pool
module.exports = pool;




// const result = await pool.query("select * from business")
// console.log(result)
