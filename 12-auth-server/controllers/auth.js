// importamos el tipado
const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async(req = request, res = response) => {

    const { email, name, password } = req.body;

    try {
           
        // verificar el email
        const usuario = await Usuario.findOne({ email: email }); // se puede poner solo email por el ES6

        if( usuario )
        {
            return res.status(400).json({
                Ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }
        // crear usuario con el modelo
        const dbUser = new Usuario(req.body);

        // Heashear (encriptar la contraseña) la contraseña

        // forma aleatoria de generar numeros que va ser parte de la validacion de la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generar el JWT 
        const token = await generarJWT(dbUser.id, dbUser.name);

        // crear usuario de BD
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            Ok: true,
            uid: dbUser.id,
            name,
            token
        })
        
    } 
    catch (error) 
    {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
        
    }

 
   
}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const dbUser = await Usuario.findOne({email: email})

        if( !dbUser )
        {
            return res.status(400).json({
                Ok: false,
                msg: 'El correo no existe'
            });
        }

        // confirmar si el password hace match
        // el metodo compare sync sirve para saber si una contraseña si al encriptarla haria un match con otra contraseña
        // que tenemos encriptada en este caso con el hash
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword )
        {
            return res.status(400).json({
                Ok: false,
                msg: 'El password no es valido'
            });
        }

        // generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // respuesta del servicio
        // para fines educativos se pone el return pero no hace falta porque es el ultimo paso
        return res.json({
            Ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const  revalidarToken =  async(req, res) => {

    const { uid, name } = req;

    const token = await generarJWT(uid, name);
   
    return res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}