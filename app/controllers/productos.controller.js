const db = require('../config/db.config.js');
const Productos = db.Productos;

// Crear un nuevo producto
exports.create = (req, res) => {
    let producto = {};

    try {
        producto.nombre = req.body.nombre;
        producto.descripcion = req.body.descripcion;
        producto.precio = req.body.precio;
        producto.categoria_id = req.body.categoria_id;
        producto.proveedor_id = req.body.proveedor_id;
        producto.imagen = req.body.imagen;

        Productos.create(producto).then(result => {
            res.status(200).json({
                message: "Producto creado exitosamente con ID = " + result.id,
                producto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todos los productos
exports.retrieveAllProductos = (req, res) => {
    Productos.findAll()
        .then(productoInfos => {
            res.status(200).json({
                message: "Obtención de todos los productos exitosa!",
                productos: productoInfos
            });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

// Obtener un producto por su ID
exports.getProductoById = (req, res) => {
    let productoId = req.params.id;
    Productos.findByPk(productoId)
        .then(producto => {
            if (producto) {
                res.status(200).json({
                    message: "Producto obtenido con éxito con ID = " + productoId,
                    producto: producto
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el producto con ID = " + productoId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

// Actualizar un producto por su ID
exports.updateById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Productos.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "No se encontró el producto con ID = " + productoId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                categoria_id: req.body.categoria_id,
                proveedor_id: req.body.proveedor_id,
                imagen: req.body.imagen
            };

            let result = await Productos.update(updatedObject, { returning: true, where: { id: productoId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el producto con ID = " + productoId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Producto actualizado exitosamente con ID = " + productoId,
                    producto: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el producto con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un producto por su ID
exports.deleteById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Productos.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "No existe un producto con ID = " + productoId,
                error: "404"
            });
        } else {
            await producto.destroy();
            res.status(200).json({
                message: "Producto eliminado exitosamente con ID = " + productoId,
                producto: producto
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el producto con ID = " + req.params.id,
            error: error.message
        });
    }
}
