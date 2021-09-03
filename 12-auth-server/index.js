const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
// esto toma la configuracion por defecto , que significa cuando la aplicacion carga le el archio enviroment
require('dotenv').config();

// objeto especial que existe en node process
// console.log(process.env);

// Crear el servidor/aplicacion de express 
const app = express();

// Base de datos
dbConnection();

// Directorio publico
app.use( express.static('public') );


// CORS
// para aplicar un middleware
app.use( cors() );

// obtener la infomarcion que viene en el body
// lectura y parseo del body
app.use( express.json() );  


// rutas
// para condigurar las rutas utilizamos algo que se llama middleware de express, no es mas que una funcion que se ejecuta
// cuando el interprete pase evaluando cada una de las lineas del codigo
app.use( '/api/auth', require('./routes/auth') );

// usamos las variables de entorno, PORT porque asi lo llamos en el archivo .env
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})