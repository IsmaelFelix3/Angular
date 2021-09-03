const { Router, json } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// los middleware se van a ejecutar como segundo argumento se pueden poner como un arreglo
// en caso de tener solo dos argumentos el segundo lo toma como el controlador
// un middleware no es mas que una funcion comun y corriente
// el check se utiliza para validar cada uno de los campos, auqnue se pueden agrupar tambien

// Crear un nuevo usuario 
router.post( '/new', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos
], crearUsuario );

// Login de usuario
router.post( '/',  [ 
    check('email','El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength( { min: 6 }),
    validarCampos 
] , loginUsuario );

// Validar y revalidar token
router.get( '/renew',validarJWT , revalidarToken );

// para exportar las cosas y que puedan ser utilizadas en otros archivos se hace asi
module.exports = router;