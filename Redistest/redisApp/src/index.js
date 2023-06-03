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

//Definiciones necesarias para poder visualizar el cuerpo de las entradas a los metodos HTTP
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
    extended: true
})); 

app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Definimos la ruta para el servidor
const server = require('../src/server');
app.use(server);


app.listen(app.get('port'), () => {
    console.log("Server on port: ", app.get('port'));
})