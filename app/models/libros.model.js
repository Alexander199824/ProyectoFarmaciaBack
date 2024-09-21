// Exporta una función que define el modelo de 'Libros'
module.exports = (sequelize, Sequelize) => {
    const Libros = sequelize.define('libros', {
        codigoLibro: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Autoincremento para el código del libro
        },
        nombreLibro: {
            type: Sequelize.STRING(60)
        },
        editorial: {
            type: Sequelize.STRING(25)
        },
        autor: {
            type: Sequelize.STRING(25)
        },
        genero: {
            type: Sequelize.STRING(20)
        },
        paisAutor: {
            type: Sequelize.STRING(20)
        },
        numeroPaginas: {
            type: Sequelize.INTEGER
        },
        anioEdicion: {
            type: Sequelize.DATE // Usamos DATE para Fecha/Hora
        },
        precioLibro: {
            type: Sequelize.FLOAT // Usamos FLOAT para el campo de moneda
        }
    });
    
    return Libros;
};
