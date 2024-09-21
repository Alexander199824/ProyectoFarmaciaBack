const db = require('../config/db.config.js');
const Usuarios = db.Usuarios;

// Crear un nuevo usuario
exports.create = (req, res) => {
    let usuario = {};

    try {
        usuario.nombre = req.body.nombre;
        usuario.correo = req.body.correo;
        usuario.contraseña = req.body.contraseña;
        usuario.direccion = req.body.direccion;
        usuario.telefono = req.body.telefono;
        usuario.tipo_usuario = req.body.tipo_usuario;
        usuario.latitud = req.body.latitud;
        usuario.longitud = req.body.longitud;
        usuario.rol_id = req.body.rol_id;
        usuario.imagen_perfil = req.body.imagen_perfil;

        Usuarios.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado exitosamente con ID = " + result.id,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todos los usuarios
exports.retrieveAllUsuarios = (req, res) => {
    Usuarios.findAll()
        .then(usuarioInfos => {
            res.status(200).json({
                message: "Obtención de todos los usuarios exitosa!",
                usuarios: usuarioInfos
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

// Obtener un usuario por su ID
exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuarios.findByPk(usuarioId)
        .then(usuario => {
            if (usuario) {
                res.status(200).json({
                    message: "Usuario obtenido con éxito con ID = " + usuarioId,
                    usuario: usuario
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el usuario con ID = " + usuarioId,
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

// Actualizar un usuario por su ID
exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuarios.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario con ID = " + usuarioId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                correo: req.body.correo,
                contraseña: req.body.contraseña,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                tipo_usuario: req.body.tipo_usuario,
                latitud: req.body.latitud,
                longitud: req.body.longitud,
                rol_id: req.body.rol_id,
                imagen_perfil: req.body.imagen_perfil
            };

            let result = await Usuarios.update(updatedObject, { returning: true, where: { id: usuarioId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el usuario con ID = " + usuarioId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Usuario actualizado exitosamente con ID = " + usuarioId,
                    usuario: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el usuario con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un usuario por su ID
exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuarios.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe un usuario con ID = " + usuarioId,
                error: "404"
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado exitosamente con ID = " + usuarioId,
                usuario: usuario
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el usuario con ID = " + req.params.id,
            error: error.message
        });
    }
}
