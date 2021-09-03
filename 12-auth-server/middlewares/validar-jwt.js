const { response } = require('express')
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response , next) => {

    const token = req.header('x-token');

    if( !token )
    {
        // el 401 es unautorice
        return res.status(401).json({
            Ok:false,
            msg: 'Error en el token'
        });
    }

    try {
        // aqui me devuelve el payload
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );

        // enviamos datos al controller desde el middleware
        // este req es la misma que la req del controller porque todos los objetos se pasan por referencia en js
        req.uid = uid;
        req.name = name;

        
        
    } 
    catch (error) 
    {
        return res.status(401).json({
            Ok:false,
            msg: 'Token no valido'
        });
    }


    // todo ok
    next();
}

module.exports = {
    validarJWT
}