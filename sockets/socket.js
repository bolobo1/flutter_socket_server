const {io} = require('../index.js');


///Mensajes de Sockets
//Esta es ya la comunicacion del socket
io.on('connection', client => {

    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    //on es para ecuchar o recibir valores
    //emitir para emitir o enviar valores
    //el valor seria el parametro " payload "
    client.on('mensaje', (payload) =>{
        console.log(payload);

        io.emit('mensaje',{admin: 'Nuevo mensaje'});
    });

});