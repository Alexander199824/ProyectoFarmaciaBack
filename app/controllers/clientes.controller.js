const db = require('../config/db.config.js');
const Clientes = db.Clientes;

// Crear un nuevo cliente
exports.create = (req, res) => {
    let cliente = {};

    try {
        cliente.nombre = req.body.nombre;
        cliente.correo = req.body.correo;
        cliente.direccion = req.body.direccion;
        cliente.telefono = req.body.telefono;
        cliente.latitud = req.body.latitud;
        cliente.longitud = req.body.longitud;

        Clientes.create(cliente).then(result => {
            res.status(200).json({
                message: "Cliente creado exitosamente con ID = " + result.id,
                cliente: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todos los clientes
exports.retrieveAllClientes = (req, res) => {
    Clientes.findAll()
        .then(clienteInfos => {
            res.status(200).json({
                message: "Obtención de todos los clientes exitosa!",
                clientes: clienteInfos
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

// Obtener un cliente por su ID
exports.getClienteById = (req, res) => {
    let clienteId = req.params.id;
    Clientes.findByPk(clienteId)
        .then(cliente => {
            if (cliente) {
                res.status(200).json({
                    message: "Cliente obtenido con éxito con ID = " + clienteId,
                    cliente: cliente
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el cliente con ID = " + clienteId,
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

// Actualizar un cliente por su ID
exports.updateById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Clientes.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No se encontró el cliente con ID = " + clienteId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                correo: req.body.correo,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                latitud: req.body.latitud,
                longitud: req.body.longitud
            };

            let result = await Clientes.update(updatedObject, { returning: true, where: { id: clienteId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el cliente con ID = " + clienteId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Cliente actualizado exitosamente con ID = " + clienteId,
                    cliente: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el cliente con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un cliente por su ID
exports.deleteById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Clientes.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No existe un cliente con ID = " + clienteId,
                error: "404"
            });
        } else {
            await cliente.destroy();
            res.status(200).json({
                message: "Cliente eliminado exitosamente con ID = " + clienteId,
                cliente: cliente
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el cliente con ID = " + req.params.id,
            error: error.message
        });
    }
}
