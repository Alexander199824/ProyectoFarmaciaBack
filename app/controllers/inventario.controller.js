const db = require('../config/db.config.js');
const Inventario = db.Inventario;

// Crear un nuevo registro en el inventario
exports.create = (req, res) => {
    let inventario = {};

    try {
        inventario.producto_id = req.body.producto_id;
        inventario.cantidad = req.body.cantidad;
        inventario.fecha_vencimiento = req.body.fecha_vencimiento;
        inventario.ubicacion = req.body.ubicacion;

        Inventario.create(inventario).then(result => {
            res.status(200).json({
                message: "Registro de inventario creado exitosamente con ID = " + result.id,
                inventario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todos los registros de inventario
exports.retrieveAllInventario = (req, res) => {
    Inventario.findAll()
        .then(inventarioInfos => {
            res.status(200).json({
                message: "Obtención de todos los registros de inventario exitosa!",
                inventario: inventarioInfos
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

// Obtener un registro de inventario por su ID
exports.getInventarioById = (req, res) => {
    let inventarioId = req.params.id;
    Inventario.findByPk(inventarioId)
        .then(inventario => {
            if (inventario) {
                res.status(200).json({
                    message: "Registro de inventario obtenido con éxito con ID = " + inventarioId,
                    inventario: inventario
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el registro de inventario con ID = " + inventarioId,
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

// Actualizar un registro de inventario por su ID
exports.updateById = async (req, res) => {
    try {
        let inventarioId = req.params.id;
        let inventario = await Inventario.findByPk(inventarioId);

        if (!inventario) {
            res.status(404).json({
                message: "No se encontró el registro de inventario con ID = " + inventarioId,
                error: "404"
            });
        } else {
            let updatedObject = {
                producto_id: req.body.producto_id,
                cantidad: req.body.cantidad,
                fecha_vencimiento: req.body.fecha_vencimiento,
                ubicacion: req.body.ubicacion
            };

            let result = await Inventario.update(updatedObject, { returning: true, where: { id: inventarioId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el registro de inventario con ID = " + inventarioId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Registro de inventario actualizado exitosamente con ID = " + inventarioId,
                    inventario: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el registro de inventario con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un registro de inventario por su ID
exports.deleteById = async (req, res) => {
    try {
        let inventarioId = req.params.id;
        let inventario = await Inventario.findByPk(inventarioId);

        if (!inventario) {
            res.status(404).json({
                message: "No existe un registro de inventario con ID = " + inventarioId,
                error: "404"
            });
        } else {
            await inventario.destroy();
            res.status(200).json({
                message: "Registro de inventario eliminado exitosamente con ID = " + inventarioId,
                inventario: inventario
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el registro de inventario con ID = " + req.params.id,
            error: error.message
        });
    }
}
