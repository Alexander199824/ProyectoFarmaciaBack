const db = require('../config/db.config.js');
const Categorias = db.Categorias;

// Crear una nueva categoría
exports.create = (req, res) => {
    let categoria = {};

    try {
        categoria.nombre = req.body.nombre;

        Categorias.create(categoria).then(result => {
            res.status(200).json({
                message: "Categoría creada exitosamente con ID = " + result.id,
                categoria: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Obtener todas las categorías
exports.retrieveAllCategorias = (req, res) => {
    Categorias.findAll()
        .then(categoriaInfos => {
            res.status(200).json({
                message: "Obtención de todas las categorías exitosa!",
                categorias: categoriaInfos
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

// Obtener una categoría por su ID
exports.getCategoriaById = (req, res) => {
    let categoriaId = req.params.id;
    Categorias.findByPk(categoriaId)
        .then(categoria => {
            if (categoria) {
                res.status(200).json({
                    message: "Categoría obtenida con éxito con ID = " + categoriaId,
                    categoria: categoria
                });
            } else {
                res.status(404).json({
                    message: "No se encontró la categoría con ID = " + categoriaId,
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

// Actualizar una categoría por su ID
exports.updateById = async (req, res) => {
    try {
        let categoriaId = req.params.id;
        let categoria = await Categorias.findByPk(categoriaId);

        if (!categoria) {
            res.status(404).json({
                message: "No se encontró la categoría con ID = " + categoriaId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre
            };

            let result = await Categorias.update(updatedObject, { returning: true, where: { id: categoriaId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar la categoría con ID = " + categoriaId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Categoría actualizada exitosamente con ID = " + categoriaId,
                    categoria: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar la categoría con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar una categoría por su ID
exports.deleteById = async (req, res) => {
    try {
        let categoriaId = req.params.id;
        let categoria = await Categorias.findByPk(categoriaId);

        if (!categoria) {
            res.status(404).json({
                message: "No existe una categoría con ID = " + categoriaId,
                error: "404"
            });
        } else {
            await categoria.destroy();
            res.status(200).json({
                message: "Categoría eliminada exitosamente con ID = " + categoriaId,
                categoria: categoria
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar la categoría con ID = " + req.params.id,
            error: error.message
        });
    }
}
