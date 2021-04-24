const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CC, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos: CONECTADO');

    } catch (error) {
        throw new Error('Error en la conexion a la base de datos');
    }

}

module.exports = {
    dbConnection
}