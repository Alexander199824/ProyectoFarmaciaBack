const db = require('../config/db.config.js');
const Transacciones = db.Transacciones;

// Crear una nueva transacción
exports.create = (req, res) => {
    let transaccion = {};

    try {
        transaccion.pedido_id = req.body.pedido_id;
        transaccion.metodo_pago = req.body.metodo_pago;
        transaccion.estado_transaccion = req.body.estado_transaccion;
        transaccion.fecha_pago = req.body.fecha_pago;

        Transacciones.create(transaccion).then(result => {
            res.status(200).json({
                message: "Transacción creada exitosamente con ID = " + result.id,
                transaccion: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todas las transacciones
exports.retrieveAllTransacciones = (req, res) => {
    Transacciones.findAll()
        .then(transaccionInfos => {
            res.status(200).json({
                message: "Obtención de todas las transacciones exitosa!",
                transacciones: transaccionInfos
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

// Obtener una transacción por su ID
exports.getTransaccionById = (req, res) => {
    let transaccionId = req.params.id;
    Transacciones.findByPk(transaccionId)
        .then(transaccion => {
            if (transaccion) {
                res.status(200).json({
                    message: "Transacción obtenida con éxito con ID = " + transaccionId,
                    transaccion: transaccion
                });
            } else {
                res.status(404).json({
                    message: "No se encontró la transacción con ID = " + transaccionId,
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

// Actualizar una transacción por su ID
exports.updateById = async (req, res) => {
    try {
        let transaccionId = req.params.id;
        let transaccion = await Transacciones.findByPk(transaccionId);

        if (!transaccion) {
            res.status(404).json({
                message: "No se encontró la transacción con ID = " + transaccionId,
                error: "404"
            });
        } else {
            let updatedObject = {
                pedido_id: req.body.pedido_id,
                metodo_pago: req.body.metodo_pago,
                estado_transaccion: req.body.estado_transaccion,
                fecha_pago: req.body.fecha_pago
            };

            let result = await Transacciones.update(updatedObject, { returning: true, where: { id: transaccionId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar la transacción con ID = " + transaccionId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Transacción actualizada exitosamente con ID = " + transaccionId,
                    transaccion: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar la transacción con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar una transacción por su ID
exports.deleteById = async (req, res) => {
    try {
        let transaccionId = req.params.id;
        let transaccion = await Transacciones.findByPk(transaccionId);

        if (!transaccion) {
            res.status(404).json({
                message: "No existe una transacción con ID = " + transaccionId,
                error: "404"
            });
        } else {
            await transaccion.destroy();
            res.status(200).json({
                message: "Transacción eliminada exitosamente con ID = " + transaccionId,
                transaccion: transaccion
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar la transacción con ID = " + req.params.id,
            error: error.message
        });
    }
}
