const db = require('../config/db.config.js');
const Libros = db.Libros;

// Función para crear un nuevo libro
exports.create = (req, res) => {
    let libro = {};

    try {
        libro.nombreLibro = req.body.nombreLibro;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.paisAutor = req.body.paisAutor;
        libro.numeroPaginas = req.body.numeroPaginas;
        libro.anioEdicion = req.body.anioEdicion;
        libro.precioLibro = req.body.precioLibro;

        Libros.create(libro).then(result => {
            res.status(200).json({
                message: "Libro creado exitosamente con ID = " + result.codigoLibro,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Función para recuperar todos los libros
exports.retrieveAllLibros = (req, res) => {
    Libros.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "Obtención de todos los libros exitosa!",
                libros: libroInfos
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

// Función para obtener un libro por su ID
exports.getLibroById = (req, res) => {
    let libroId = req.params.id;
    Libros.findByPk(libroId)
        .then(libro => {
            if (libro) {
                res.status(200).json({
                    message: "Libro obtenido con éxito con ID = " + libroId,
                    libro: libro
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el libro con ID = " + libroId,
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

// Función para actualizar un libro por su ID
exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró el libro con ID = " + libroId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombreLibro: req.body.nombreLibro,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                paisAutor: req.body.paisAutor,
                numeroPaginas: req.body.numeroPaginas,
                anioEdicion: req.body.anioEdicion,
                precioLibro: req.body.precioLibro
            };

            let result = await Libros.update(updatedObject, { returning: true, where: { codigoLibro: libroId } });

            if (!result || result[0] === 0) {  // Verifica si no se actualizó nada
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el libro con ID = " + libroId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Libro actualizado exitosamente con ID = " + libroId,
                    libro: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el libro con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Función para eliminar un libro por su ID
exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe un libro con ID = " + libroId,
                error: "404"
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con ID = " + libroId,
                libro: libro
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el libro con ID = " + req.params.id,
            error: error.message
        });
    }
}
