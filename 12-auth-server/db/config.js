const mongoose = require("mongoose");

const dbConnection = async() => {

    try{
        // se agrega una configuracion que en la pagina oficial de mongoose recomiendan
        await mongoose.connect( process.env.BD_CNN);

        console.log('Base de datos Online');
    }
    catch (error){
        console.log(error);
        throw new Error('Error a la hora de inicializar DB');
    }
}

module.exports = {
    dbConnection
}