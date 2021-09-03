// se debe de poner el nombre en singular el archivo

const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// para exportarlo aqui es diferente se utiliza el metodo model de mongoose y pide el nombre del modelo , seguido del esquema
// mongoose se va a encargar de ponerle el plural ala hora de crear la coleccion en la base de datos
module.exports = model('Usuario', UsuarioSchema);
