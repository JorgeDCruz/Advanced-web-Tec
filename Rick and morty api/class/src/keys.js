require('dotenv').config()
module.exports = {
    database: {
        //Cambiamos las credenciales por las llaves puestas en el .env
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
        // host: "localhost",
        // user: "root",
        // password: "Madrilenio3141616_]",
        // database: "itesm502"
    }
}