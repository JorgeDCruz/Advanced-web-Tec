const express = require('express');
const router = express.Router();
const pool = require('../database');
const redis = require("redis");
const { createKey } = require("../lib/encryp");
const client = require("../redis")



router.get('/', async (req, res) => {
    res.render("home.html")
});

router.post('/', async (req, res) => {
    let startTime = Date.now();
    let responseName = req.body.username;
    let endTime;


    let message;
    let result;

    const response = await client.hGetAll(responseName);
    const parsedResponse = JSON.stringify(response, null, 2);
    //No se encuentra en el cache
    if(parsedResponse.length == 2){
        result = "Cache Miss";
        const execQuery = "SELECT * FROM user WHERE username = \'" + responseName + "\'";
        const rows = await pool.query(execQuery);

        //Solamente contaremos el tiempo de ejecucion de la consulta
        endTime = Date.now() - startTime;
        //Si el usuario si existe en la base de datos se insertara al cache
        if(rows.length != 0){
            await client.hSet(responseName, rows[0]);
            message = "1 seg";
        }
        else{ //Si no se mostrara un error
            message = "ERROR: username " + responseName + " doesn't exist in the database";
            responseName = "USER NOT IN DATABASE";
        }
    }
    else{ //Si se encuentra en el cache
        endTime = Date.now() - startTime;
        result = "Cache Hit";
    }
    message = endTime + " ms";
    //res.redirect({name: responseName, result: result, message: message}, "/results");
    res.render("results.html", {name: responseName, result: result, message: message})
})


module.exports = router;