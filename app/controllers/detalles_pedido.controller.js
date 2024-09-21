const db = require('../config/db.config.js');
const DetallesPedido = db.DetallesPedido;

// Crear un nuevo detalle de pedido
exports.create = (req, res) => {
    let detalle = {};

    try {
        detalle.pedido_id = req.body.pedido_id;
        detalle.producto_id = req.body.producto_id;
        detalle.cantidad = req.body.cantidad;
        detalle.precio = req.body.precio;

        DetallesPedido.create(detalle).then(result => {
            res.status(200).json({
                message: "Detalle de pedido creado exitosamente con ID = " + result.id,
                detalle: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todos los detalles de pedido
exports.retrieveAllDetallesPedido = (req, res) => {
    DetallesPedido.findAll()
        .then(detalleInfos => {
            res.status(200).json({
                message: "Obtención de todos los detalles de pedido exitosa!",
                detalles: detalleInfos
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

// Obtener un detalle de pedido por su ID
exports.getDetallePedidoById = (req, res) => {
    let detalleId = req.params.id;
    DetallesPedido.findByPk(detalleId)
        .then(detalle => {
            if (detalle) {
                res.status(200).json({
                    message: "Detalle de pedido obtenido con éxito con ID = " + detalleId,
                    detalle: detalle
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el detalle de pedido con ID = " + detalleId,
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

// Actualizar un detalle de pedido por su ID
exports.updateById = async (req, res) => {
    try {
        let detalleId = req.params.id;
        let detalle = await DetallesPedido.findByPk(detalleId);

        if (!detalle) {
            res.status(404).json({
                message: "No se encontró el detalle de pedido con ID = " + detalleId,
                error: "404"
            });
        } else {
            let updatedObject = {
                pedido_id: req.body.pedido_id,
                producto_id: req.body.producto_id,
                cantidad: req.body.cantidad,
                precio: req.body.precio
            };

            let result = await DetallesPedido.update(updatedObject, { returning: true, where: { id: detalleId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el detalle de pedido con ID = " + detalleId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Detalle de pedido actualizado exitosamente con ID = " + detalleId,
                    detalle: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el detalle de pedido con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un detalle de pedido por su ID
exports.deleteById = async (req, res) => {
    try {
        let detalleId = req.params.id;
        let detalle = await DetallesPedido.findByPk(detalleId);

        if (!detalle) {
            res.status(404).json({
                message: "No existe un detalle de pedido con ID = " + detalleId,
                error: "404"
            });
        } else {
            await detalle.destroy();
            res.status(200).json({
                message: "Detalle de pedido eliminado exitosamente con ID = " + detalleId,
                detalle: detalle
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el detalle de pedido con ID = " + req.params.id,
            error: error.message
        });
    }
}
