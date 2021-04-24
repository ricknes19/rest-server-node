const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutes = '/api/usuarios';
        
        // Conectar a la base de datos
        this.connectDB();

        this.middlewares();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.usuariosRoutes, require('../routes/usuario'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Escuchando servidor en el puerto', this.port);
        });
    }

}

module.exports = Server;