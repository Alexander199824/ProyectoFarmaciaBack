const db = require('../config/db.config.js');
const Locales = db.Locales;

// Crear un nuevo local
exports.create = (req, res) => {
    let local = {};

    try {
        local.nombre = req.body.nombre;
        local.direccion = req.body.direccion;
        local.telefono = req.body.telefono;

        Locales.create(local).then(result => {
            res.status(200).json({
                message: "Local creado exitosamente con ID = " + result.id,
                local: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todos los locales
exports.retrieveAllLocales = (req, res) => {
    Locales.findAll()
        .then(localInfos => {
            res.status(200).json({
                message: "Obtención de todos los locales exitosa!",
                locales: localInfos
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

// Obtener un local por su ID
exports.getLocalById = (req, res) => {
    let localId = req.params.id;
    Locales.findByPk(localId)
        .then(local => {
            if (local) {
                res.status(200).json({
                    message: "Local obtenido con éxito con ID = " + localId,
                    local: local
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el local con ID = " + localId,
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

// Actualizar un local por su ID
exports.updateById = async (req, res) => {
    try {
        let localId = req.params.id;
        let local = await Locales.findByPk(localId);

        if (!local) {
            res.status(404).json({
                message: "No se encontró el local con ID = " + localId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                telefono: req.body.telefono
            };

            let result = await Locales.update(updatedObject, { returning: true, where: { id: localId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el local con ID = " + localId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Local actualizado exitosamente con ID = " + localId,
                    local: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el local con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un local por su ID
exports.deleteById = async (req, res) => {
    try {
        let localId = req.params.id;
        let local = await Locales.findByPk(localId);

        if (!local) {
            res.status(404).json({
                message: "No existe un local con ID = " + localId,
                error: "404"
            });
        } else {
            await local.destroy();
            res.status(200).json({
                message: "Local eliminado exitosamente con ID = " + localId,
                local: local
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el local con ID = " + req.params.id,
            error: error.message
        });
    }
}
