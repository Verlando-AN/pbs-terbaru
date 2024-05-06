const mysql = require("mysql");

const db = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6704475",
    database: "sql6704475",
    password: "AE93jX7CYU",
});


module.exports = db;
