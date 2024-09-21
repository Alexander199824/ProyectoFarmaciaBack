// Importa la configuración del entorno desde el archivo env.js
const env = require('./env.js');

// Importa el módulo Sequelize
const Sequelize = require('sequelize');

// Crea una nueva instancia de Sequelize para conectarse a la base de datos
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host, // Dirección del host de la base de datos
  dialect: env.dialect, // Dialecto de la base de datos (e.g., 'mysql', 'postgres')
  dialectOptions: {
    ssl: { // Configuración de SSL
      require: true, // Requiere conexión SSL
      rejectUnauthorized: false // No rechazar conexiones no autorizadas (útil para ciertos entornos)
    }
  },
  //operatorsAliases: false, // Desactiva alias de operadores para seguridad

  // Configuración del pool de conexiones
  pool: {
    max: env.max, // Número máximo de conexiones en el pool
    min: env.pool.min, // Número mínimo de conexiones en el pool
    acquire: env.pool.acquire, // Tiempo máximo de espera para adquirir una conexión
    idle: env.pool.idle, // Tiempo máximo que una conexión puede estar inactiva
  }
});

// Crea un objeto para almacenar el módulo de la base de datos
const db = {};

// Almacena la clase Sequelize en el objeto db
db.Sequelize = Sequelize;
// Almacena la instancia de conexión de Sequelize en el objeto db
db.sequelize = sequelize;

// Importa y define los modelos en el objeto db
db.Clientes = require('../models/clientes.model.js')(sequelize, Sequelize);
db.Productos = require('../models/productos.model.js')(sequelize, Sequelize);
db.Usuarios = require('../models/usuarios.model.js')(sequelize, Sequelize);
db.Pedidos = require('../models/pedidos.model.js')(sequelize, Sequelize);
db.DetallesPedido = require('../models/detalles_pedido.model.js')(sequelize, Sequelize);
db.Inventario = require('../models/inventario.model.js')(sequelize, Sequelize);
db.Locales = require('../models/locales.model.js')(sequelize, Sequelize);
db.VentasLocales = require('../models/ventas_locales.model.js')(sequelize, Sequelize);
db.Roles = require('../models/roles.model.js')(sequelize, Sequelize);
db.Proveedores = require('../models/proveedores.model.js')(sequelize, Sequelize);
db.Categorias = require('../models/categorias.model.js')(sequelize, Sequelize);
db.Transacciones = require('../models/transacciones.model.js')(sequelize, Sequelize);

// Exporta el objeto db para usarlo en otras partes de la aplicación
module.exports = db;


