const db = require('../config/db.config.js');
const VentasLocales = db.VentasLocales;

// Crear una nueva venta local
exports.create = (req, res) => {
    let venta = {};

    try {
        venta.local_id = req.body.local_id;
        venta.producto_id = req.body.producto_id;
        venta.cantidad = req.body.cantidad;
        venta.precio = req.body.precio;
        venta.fecha_venta = req.body.fecha_venta;

        VentasLocales.create(venta).then(result => {
            res.status(200).json({
                message: "Venta local creada exitosamente con ID = " + result.id,
                venta: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todas las ventas locales
exports.retrieveAllVentasLocales = (req, res) => {
    VentasLocales.findAll()
        .then(ventaInfos => {
            res.status(200).json({
                message: "Obtención de todas las ventas locales exitosa!",
                ventas: ventaInfos
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

// Obtener una venta local por su ID
exports.getVentaLocalById = (req, res) => {
    let ventaId = req.params.id;
    VentasLocales.findByPk(ventaId)
        .then(venta => {
            if (venta) {
                res.status(200).json({
                    message: "Venta local obtenida con éxito con ID = " + ventaId,
                    venta: venta
                });
            } else {
                res.status(404).json({
                    message: "No se encontró la venta local con ID = " + ventaId,
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

// Actualizar una venta local por su ID
exports.updateById = async (req, res) => {
    try {
        let ventaId = req.params.id;
        let venta = await VentasLocales.findByPk(ventaId);

        if (!venta) {
            res.status(404).json({
                message: "No se encontró la venta local con ID = " + ventaId,
                error: "404"
            });
        } else {
            let updatedObject = {
                local_id: req.body.local_id,
                producto_id: req.body.producto_id,
                cantidad: req.body.cantidad,
                precio: req.body.precio,
                fecha_venta: req.body.fecha_venta
            };

            let result = await VentasLocales.update(updatedObject, { returning: true, where: { id: ventaId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar la venta local con ID = " + ventaId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Venta local actualizada exitosamente con ID = " + ventaId,
                    venta: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar la venta local con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar una venta local por su ID
exports.deleteById = async (req, res) => {
    try {
        let ventaId = req.params.id;
        let venta = await VentasLocales.findByPk(ventaId);

        if (!venta) {
            res.status(404).json({
                message: "No existe una venta local con ID = " + ventaId,
                error: "404"
            });
        } else {
            await venta.destroy();
            res.status(200).json({
                message: "Venta local eliminada exitosamente con ID = " + ventaId,
                venta: venta
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar la venta local con ID = " + req.params.id,
            error: error.message
        });
    }
}
