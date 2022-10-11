const mariadb = require("mariadb")

const config = {
host: process.env.DB_HOST=localhost,
user: process.env.DB_USER=prueba_user,
password: process.env.DB_PASSWORD=678911,
database: process.env.DB_NAME=prueba,
port: process.env.DB_PORT=3306,
connectionLimit: process.env.DB_CONM_LIMIT=10,
}

const pool = mariadb.createPool(config)

module.exports = pool