const { response } = require("express");
const Usuario = require('../models/usuarios');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");


const crearUsuario = async(req, res = response) => {

    //Esta linea es super importante
    //lo que hace es extraer los parametros para poder trabajar con ellos
    //hacerles filtros o validaciones
    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encripar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
            //body: req.body
            //msg: 'Controllers Crear usuario!!!'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }

}


const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        //Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
            //body: req.body
            //msg: 'Controllers Crear usuario!!!'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }

}

const renewToken = async(req, res = response) => {

    try {
        const _id = req.uid;
        //Generar el JWT
        const usuarioDB = await Usuario.findById({ _id });
        //valida existenica 
        if (usuarioDB != null) {
            //genera el token
            const token = await generarJWT(usuarioDB._id);
            return res.json({
                ok: true,
                usuarioDB,
                msg: 'Renew',
                token
            });
        } else {
            return res.json({
                ok: false,
                msg: 'Error al renovar el token',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }

    /*
    //CODIGO ALTERNATIVO HECHO EN EL TUTO
       res.json({
           ok: true,
           uid: req.uid,
           msg: 'Renew'
       });

          
           const uid = req.uid;

       const token = await generarJWT(uid);

       const usuario = await Usuario.findById(uid);

       res.json({
           ok: true,
           usuario,
           token
       });
       */

}


module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}