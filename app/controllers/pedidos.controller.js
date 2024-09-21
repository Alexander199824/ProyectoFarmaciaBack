const db = require('../config/db.config.js');
const Pedidos = db.Pedidos;

// Crear un nuevo pedido
exports.create = (req, res) => {
    let pedido = {};

    try {
        pedido.usuario_id = req.body.usuario_id;
        pedido.fecha_pedido = req.body.fecha_pedido;
        pedido.estado = req.body.estado;

        Pedidos.create(pedido).then(result => {
            res.status(200).json({
                message: "Pedido creado exitosamente con ID = " + result.id,
                pedido: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todos los pedidos
exports.retrieveAllPedidos = (req, res) => {
    Pedidos.findAll()
        .then(pedidoInfos => {
            res.status(200).json({
                message: "Obtención de todos los pedidos exitosa!",
                pedidos: pedidoInfos
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

// Obtener un pedido por su ID
exports.getPedidoById = (req, res) => {
    let pedidoId = req.params.id;
    Pedidos.findByPk(pedidoId)
        .then(pedido => {
            if (pedido) {
                res.status(200).json({
                    message: "Pedido obtenido con éxito con ID = " + pedidoId,
                    pedido: pedido
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el pedido con ID = " + pedidoId,
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

// Actualizar un pedido por su ID
exports.updateById = async (req, res) => {
    try {
        let pedidoId = req.params.id;
        let pedido = await Pedidos.findByPk(pedidoId);

        if (!pedido) {
            res.status(404).json({
                message: "No se encontró el pedido con ID = " + pedidoId,
                error: "404"
            });
        } else {
            let updatedObject = {
                usuario_id: req.body.usuario_id,
                fecha_pedido: req.body.fecha_pedido,
                estado: req.body.estado
            };

            let result = await Pedidos.update(updatedObject, { returning: true, where: { id: pedidoId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el pedido con ID = " + pedidoId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Pedido actualizado exitosamente con ID = " + pedidoId,
                    pedido: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el pedido con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un pedido por su ID
exports.deleteById = async (req, res) => {
    try {
        let pedidoId = req.params.id;
        let pedido = await Pedidos.findByPk(pedidoId);

        if (!pedido) {
            res.status(404).json({
                message: "No existe un pedido con ID = " + pedidoId,
                error: "404"
            });
        } else {
            await pedido.destroy();
            res.status(200).json({
                message: "Pedido eliminado exitosamente con ID = " + pedidoId,
                pedido: pedido
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el pedido con ID = " + req.params.id,
            error: error.message
        });
    }
}
