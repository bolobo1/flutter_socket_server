const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },

});

//Con este metodo lo que se esta haciendo es seleccionar que propiedades
//quiero que retorne la respuesta o reponse cuando se haga el insert
//en este caso estoy excluyendo de la respuesta " __v, _id, password "
//Pero le estoy diciendo que me conserve las demas con la instruccion
//  ...object
UsuarioSchema.method('toJson', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Usuario', UsuarioSchema);