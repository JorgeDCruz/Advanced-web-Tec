const express = require('express');
const router = express.Router();
const pool = require('../database');
const redis = require("redis");
const { createKey } = require("../lib/encryp");



//Creamos la conexión al cliente de redis
//Para que esto funcione hay que tener instalado el servidor de redis: https://redis.io/docs/getting-started/installation/install-redis-on-windows/
const client = redis.createClient();
client.connect()
.then(async (res) => {
    console.log("Connected to redis client!");
})
.catch((err) => {
    console.log("Error connecting to redis client: ", err);
})



router.get('/', async (req, res) => {
    const execQuery = "SELECT * FROM user";
    const rows = await pool.query(execQuery);
    
    // const name = rows[0].username;
    // //Redis como cache
    // await client.hSet(name, rows[0]);
    // const response = await client.hGetAll(name);
    // const parsedResponse = JSON.stringify(response, null, 2);
    // if(parsedResponse.length == 0){
    //     console.log("Cache miss");
    // }else{
    //     console.log(parsedResponse);
    // }
    res.render("home.html", {name: rows[0]})
});

router.post('/', async (req, res) => {
    let responseName = req.body.username;

    let message;
    let result;

    const response = await client.hGetAll(responseName);
    const parsedResponse = JSON.stringify(response, null, 2);
    //No se encuentra en el cache
    if(parsedResponse.length == 2){
        result = "Cache Miss";
        const execQuery = "SELECT * FROM user WHERE username = \'" + responseName + "\'";
        const rows = await pool.query(execQuery);
        //Si el usuario si existe en la base de datos se insertara al cache
        if(rows.length != 0){
            await client.hSet(responseName, rows[0]);
            message = "1 seg";
        }
        else{ //Si no se mostrara un error
            message = "ERROR: username " + responseName + " doesn't exist in the database";
            responseName = "NULL";
        }
    }
    else{ //Si se encuentra en el cache
        result = "Cache Hit"
        message = "1 seg"
    }
    res.render("results.html", {name: responseName, result: result, message: message})
})


module.exports = router;