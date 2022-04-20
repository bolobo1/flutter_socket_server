const{validationResult} = require("express-validator");

///Parametros
//El parametro "next" lo que hace es decirle al servidor express que la validacion que se hizo es correcta
//y que prosiga con la siguiente


const validarCampos =(req, res, next ) =>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errores.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}



