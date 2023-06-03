const express = require('express');
const app = express();
const path = require('path');

//Configuracion para el .env
require('dotenv').config();

app.set('port', process.env.PORT || 3000);

//Para utilizar el "view engine" tenemos que especificar de donde se van a sacar estas vistas
app.set('views', path.join(__dirname, 'views'));
//Especificamos que las vistas van a ser de tipo html
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");

//Definimos la ruta para el servidor
const server = require('../Redistest/server')
app.use(server);


app.listen(app.get('port'), () => {
    console.log("Server on port: ", app.get('port'))
})