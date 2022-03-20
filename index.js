const express = require('express');
const path = require('path');
require('dotenv').config();

//App de Express
const app = express();

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



server.listen(process.env.PORT, (err)=>{

    if(err) throw new Error(err);

    console.log('Servidor corriendo en puerto!!!!!', process.env.PORT);
    
});
