const express = require('express');
const path = require('path');
require('dotenv').config();

//Configuracion de base de datos
const {dbConnection} = require('./database/config');
dbConnection();
//App de Express
const app = express();

//Lectura y parseo del Body
//Esto es para la lectura de los datos que vienen del posteo
//Eso seria un middleware 
app.use(express.json());

///Node Server
///Sockets
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//path publico
//__dirnmae hace referencia a la dirrecion
//Ejemplos localhost, https//
//La direccion web o de host propiamente
const publicPath = path.resolve( __dirname, 'public');
///Esta linea es para que pueda acceder al directorio de archivos publicos donde esta el index.html
app.use(express.static(publicPath));

//Mis Rutas de posteos
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (err)=>{

    if(err) throw new Error(err);

    console.log('Servidor corriendo en puerto!!!!!', process.env.PORT);
    
});
