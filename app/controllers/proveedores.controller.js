const db = require('../config/db.config.js');
const Proveedores = db.Proveedores;

// Crear un nuevo proveedor
exports.create = (req, res) => {
    let proveedor = {};

    try {
        proveedor.nombre = req.body.nombre;
        proveedor.contacto = req.body.contacto;

        Proveedores.create(proveedor).then(result => {
            res.status(200).json({
                message: "Proveedor creado exitosamente con ID = " + result.id,
                proveedor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todos los proveedores
exports.retrieveAllProveedores = (req, res) => {
    Proveedores.findAll()
        .then(proveedorInfos => {
            res.status(200).json({
                message: "Obtención de todos los proveedores exitosa!",
                proveedores: proveedorInfos
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

// Obtener un proveedor por su ID
exports.getProveedorById = (req, res) => {
    let proveedorId = req.params.id;
    Proveedores.findByPk(proveedorId)
        .then(proveedor => {
            if (proveedor) {
                res.status(200).json({
                    message: "Proveedor obtenido con éxito con ID = " + proveedorId,
                    proveedor: proveedor
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el proveedor con ID = " + proveedorId,
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

// Actualizar un proveedor por su ID
exports.updateById = async (req, res) => {
    try {
        let proveedorId = req.params.id;
        let proveedor = await Proveedores.findByPk(proveedorId);

        if (!proveedor) {
            res.status(404).json({
                message: "No se encontró el proveedor con ID = " + proveedorId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                contacto: req.body.contacto
            };

            let result = await Proveedores.update(updatedObject, { returning: true, where: { id: proveedorId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el proveedor con ID = " + proveedorId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Proveedor actualizado exitosamente con ID = " + proveedorId,
                    proveedor: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el proveedor con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un proveedor por su ID
exports.deleteById = async (req, res) => {
    try {
        let proveedorId = req.params.id;
        let proveedor = await Proveedores.findByPk(proveedorId);

        if (!proveedor) {
            res.status(404).json({
                message: "No existe un proveedor con ID = " + proveedorId,
                error: "404"
            });
        } else {
            await proveedor.destroy();
            res.status(200).json({
                message: "Proveedor eliminado exitosamente con ID = " + proveedorId,
                proveedor: proveedor
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el proveedor con ID = " + req.params.id,
            error: error.message
        });
    }
}
