const db = require('../config/db.config.js');
const Roles = db.Roles;

// Crear un nuevo rol
exports.create = (req, res) => {
    let rol = {};

    try {
        rol.nombre = req.body.nombre;

        Roles.create(rol).then(result => {
            res.status(200).json({
                message: "Rol creado exitosamente con ID = " + result.id,
                rol: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todos los roles
exports.retrieveAllRoles = (req, res) => {
    Roles.findAll()
        .then(rolInfos => {
            res.status(200).json({
                message: "Obtención de todos los roles exitosa!",
                roles: rolInfos
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

// Obtener un rol por su ID
exports.getRolById = (req, res) => {
    let rolId = req.params.id;
    Roles.findByPk(rolId)
        .then(rol => {
            if (rol) {
                res.status(200).json({
                    message: "Rol obtenido con éxito con ID = " + rolId,
                    rol: rol
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el rol con ID = " + rolId,
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

// Actualizar un rol por su ID
exports.updateById = async (req, res) => {
    try {
        let rolId = req.params.id;
        let rol = await Roles.findByPk(rolId);

        if (!rol) {
            res.status(404).json({
                message: "No se encontró el rol con ID = " + rolId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre
            };

            let result = await Roles.update(updatedObject, { returning: true, where: { id: rolId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el rol con ID = " + rolId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Rol actualizado exitosamente con ID = " + rolId,
                    rol: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el rol con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un rol por su ID
exports.deleteById = async (req, res) => {
    try {
        let rolId = req.params.id;
        let rol = await Roles.findByPk(rolId);

        if (!rol) {
            res.status(404).json({
                message: "No existe un rol con ID = " + rolId,
                error: "404"
            });
        } else {
            await rol.destroy();
            res.status(200).json({
                message: "Rol eliminado exitosamente con ID = " + rolId,
                rol: rol
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el rol con ID = " + req.params.id,
            error: error.message
        });
    }
}
