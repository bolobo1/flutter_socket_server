/*  
    path: api/login
    En esta clase se establecen las rutas del servidor
    response -> esta libreria nos ayuda al tipado
    el tipado nos sirve para mapear los datos de una 
    manera mas rapida y ordenada
*/
const { Router, response } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middelwares/validar_campos');
const { validarJWT } = require('../middelwares/validar_jwt');
const router = Router();


///Metodo POST
///req = request o solicitud
///res = response o respuesta
//La siguiente linea lo que hace es validar que los campos no esten vacio
///check('nombre','El nombre es Obligatorio').not().isEmpty(),
router.post('/new', [
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('email', 'El email es Obligatorio').not().isEmpty(),
    check('email', 'Email invalido').isEmail(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario);

router.post('/auth', [
    check('email', 'El email es Obligatorio').not().isEmpty(),
    check('email', 'Email invalido').isEmail(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

router.get('/renew', validarJWT, renewToken);

module.exports = router;