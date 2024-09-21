// Importa el módulo Express
let express = require('express');
// Crea un nuevo enrutador de Express
let router = express.Router();


const clientes = require('../controllers/clientes.controller.js');
const productos = require('../controllers/productos.controller.js');
const usuarios = require('../controllers/usuarios.controller.js');
const pedidos = require('../controllers/pedidos.controller.js');
const detallesPedido = require('../controllers/detalles_pedido.controller.js');
const inventario = require('../controllers/inventario.controller.js');
const locales = require('../controllers/locales.controller.js');
const ventasLocales = require('../controllers/ventas_locales.controller.js');
const roles = require('../controllers/roles.controller.js');
const proveedores = require('../controllers/proveedores.controller.js');
const categorias = require('../controllers/categorias.controller.js');
const transacciones = require('../controllers/transacciones.controller.js');
const pagosPaypal = require('../controllers/pagosPaypal.controller.js');



// Rutas para el modelo Clientes
router.post('/api/clientes/create', clientes.create);
router.get('/api/clientes/all', clientes.retrieveAllClientes);
router.get('/api/clientes/onebyid/:id', clientes.getClienteById);
router.put('/api/clientes/update/:id', clientes.updateById);
router.delete('/api/clientes/delete/:id', clientes.deleteById);

// Rutas para el modelo Productos
router.post('/api/productos/create', productos.create);
router.get('/api/productos/all', productos.retrieveAllProductos);
router.get('/api/productos/onebyid/:id', productos.getProductoById);
router.put('/api/productos/update/:id', productos.updateById);
router.delete('/api/productos/delete/:id', productos.deleteById);

// Rutas para el modelo Usuarios
router.post('/api/usuarios/create', usuarios.create);
router.get('/api/usuarios/all', usuarios.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', usuarios.getUsuarioById);
router.put('/api/usuarios/update/:id', usuarios.updateById);
router.delete('/api/usuarios/delete/:id', usuarios.deleteById);

// Rutas para el modelo Pedidos
router.post('/api/pedidos/create', pedidos.create);
router.get('/api/pedidos/all', pedidos.retrieveAllPedidos);
router.get('/api/pedidos/onebyid/:id', pedidos.getPedidoById);
router.put('/api/pedidos/update/:id', pedidos.updateById);
router.delete('/api/pedidos/delete/:id', pedidos.deleteById);

// Rutas para el modelo Detalles de Pedido
router.post('/api/detalles_pedido/create', detallesPedido.create);
router.get('/api/detalles_pedido/all', detallesPedido.retrieveAllDetallesPedido);
router.get('/api/detalles_pedido/onebyid/:id', detallesPedido.getDetallePedidoById);
router.put('/api/detalles_pedido/update/:id', detallesPedido.updateById);
router.delete('/api/detalles_pedido/delete/:id', detallesPedido.deleteById);

// Rutas para el modelo Inventario
router.post('/api/inventario/create', inventario.create);
router.get('/api/inventario/all', inventario.retrieveAllInventario);
router.get('/api/inventario/onebyid/:id', inventario.getInventarioById);
router.put('/api/inventario/update/:id', inventario.updateById);
router.delete('/api/inventario/delete/:id', inventario.deleteById);

// Rutas para el modelo Locales
router.post('/api/locales/create', locales.create);
router.get('/api/locales/all', locales.retrieveAllLocales);
router.get('/api/locales/onebyid/:id', locales.getLocalById);
router.put('/api/locales/update/:id', locales.updateById);
router.delete('/api/locales/delete/:id', locales.deleteById);

// Rutas para el modelo Ventas Locales
router.post('/api/ventas_locales/create', ventasLocales.create);
router.get('/api/ventas_locales/all', ventasLocales.retrieveAllVentasLocales);
router.get('/api/ventas_locales/onebyid/:id', ventasLocales.getVentaLocalById);
router.put('/api/ventas_locales/update/:id', ventasLocales.updateById);
router.delete('/api/ventas_locales/delete/:id', ventasLocales.deleteById);

// Rutas para el modelo Roles
router.post('/api/roles/create', roles.create);
router.get('/api/roles/all', roles.retrieveAllRoles);
router.get('/api/roles/onebyid/:id', roles.getRolById);
router.put('/api/roles/update/:id', roles.updateById);
router.delete('/api/roles/delete/:id', roles.deleteById);

// Rutas para el modelo Proveedores
router.post('/api/proveedores/create', proveedores.create);
router.get('/api/proveedores/all', proveedores.retrieveAllProveedores);
router.get('/api/proveedores/onebyid/:id', proveedores.getProveedorById);
router.put('/api/proveedores/update/:id', proveedores.updateById);
router.delete('/api/proveedores/delete/:id', proveedores.deleteById);

// Rutas para el modelo Categorias
router.post('/api/categorias/create', categorias.create);
router.get('/api/categorias/all', categorias.retrieveAllCategorias);
router.get('/api/categorias/onebyid/:id', categorias.getCategoriaById);
router.put('/api/categorias/update/:id', categorias.updateById);
router.delete('/api/categorias/delete/:id', categorias.deleteById);

// Rutas para el modelo Transacciones
router.post('/api/transacciones/create', transacciones.create);
router.get('/api/transacciones/all', transacciones.retrieveAllTransacciones);
router.get('/api/transacciones/onebyid/:id', transacciones.getTransaccionById);
router.put('/api/transacciones/update/:id', transacciones.updateById);
router.delete('/api/transacciones/delete/:id', transacciones.deleteById);

// Rutas para PayPal
router.post('/api/paypal/create', pagosPaypal.createPayment);
router.get('/api/paypal/execute', pagosPaypal.executePayment);
router.get('/api/paypal/cancel', pagosPaypal.cancelPayment);



// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;
