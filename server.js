// Importa el módulo Express
const express = require('express');
// Crea una instancia de la aplicación Express
const app = express();

// Importa el módulo body-parser
var bodyParser = require('body-parser');

// Importa la configuración de la base de datos
const db = require('./app/config/db.config.js');

// Importa el enrutador de rutas
let router = require('./app/routers/router.js');

// Importa y configura el middleware CORS
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200', // Origen permitido para las solicitudes
    optionsSuccessStatus: 200 // Estado de éxito para las solicitudes de opciones
};
app.use(cors(corsOptions));

// Usa body-parser para analizar las solicitudes entrantes como JSON
app.use(bodyParser.json());

// Sincroniza la base de datos: force: false no eliminará las tablas existentes
db.sequelize.sync({ force: true }).then(() => {
    console.log('Base de datos sincronizada con eliminar tablas existentes');
    
    // Usa el enrutador para manejar las rutas
    app.use('/', router);

    // Define una ruta GET para la raíz de la aplicación
    app.get("/", (req, res) => {
        res.json({ message: "Bienvenido a la aplicación de gestión de Farmacia" });
    });

    // Crea un servidor que escuche en el puerto 8080
    const server = app.listen(8080, function () {
        let host = server.address().address;
        let port = server.address().port;

        console.log("App listening at http://%s:%s", host, port); 
    });
}).catch(error => {
    console.log("Error al sincronizar la base de datos:", error);
});
