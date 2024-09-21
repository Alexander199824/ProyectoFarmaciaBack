const db = require('../config/db.config.js');
const Prestamos = db.Prestamos;

// Función para crear un nuevo préstamo
exports.create = (req, res) => {
    let prestamo = {};

    try {
        prestamo.codigoLibro = req.body.codigoLibro;
        prestamo.codigoUsuario = req.body.codigoUsuario;
        prestamo.fechaSalida = req.body.fechaSalida;
        prestamo.fechaMaximaDevolucion = req.body.fechaMaximaDevolucion;
        prestamo.fechaDevolucion = req.body.fechaDevolucion;

        Prestamos.create(prestamo).then(result => {
            res.status(200).json({
                message: "Préstamo creado exitosamente con número de pedido = " + result.numeroPedido,
                prestamo: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Función para recuperar todos los préstamos
exports.retrieveAllPrestamos = (req, res) => {
    Prestamos.findAll()
        .then(prestamoInfos => {
            res.status(200).json({
                message: "Obtención de todos los préstamos exitosa!",
                prestamos: prestamoInfos
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

// Función para obtener un préstamo por su número de pedido
exports.getPrestamoById = (req, res) => {
    let prestamoId = req.params.id;
    Prestamos.findByPk(prestamoId)
        .then(prestamo => {
            if (prestamo) {
                res.status(200).json({
                    message: "Préstamo obtenido con éxito con número de pedido = " + prestamoId,
                    prestamo: prestamo
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el préstamo con número de pedido = " + prestamoId,
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

// Función para actualizar un préstamo por su número de pedido
exports.updateById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamos.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No se encontró el préstamo con número de pedido = " + prestamoId,
                error: "404"
            });
        } else {
            let updatedObject = {
                codigoLibro: req.body.codigoLibro,
                codigoUsuario: req.body.codigoUsuario,
                fechaSalida: req.body.fechaSalida,
                fechaMaximaDevolucion: req.body.fechaMaximaDevolucion,
                fechaDevolucion: req.body.fechaDevolucion
            };

            let result = await Prestamos.update(updatedObject, { returning: true, where: { numeroPedido: prestamoId } });

            if (!result || result[0] === 0) {  // Verifica si no se actualizó nada
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el préstamo con número de pedido = " + prestamoId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Préstamo actualizado exitosamente con número de pedido = " + prestamoId,
                    prestamo: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el préstamo con número de pedido = " + req.params.id,
            error: error.message
        });
    }
}

// Función para eliminar un préstamo por su número de pedido
exports.deleteById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamos.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No existe un préstamo con número de pedido = " + prestamoId,
                error: "404"
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Préstamo eliminado exitosamente con número de pedido = " + prestamoId,
                prestamo: prestamo
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el préstamo con número de pedido = " + req.params.id,
            error: error.message
        });
    }
}
