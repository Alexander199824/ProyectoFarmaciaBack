// Exporta una función que define el modelo de 'Prestamos'
module.exports = (sequelize, Sequelize) => {
    const Prestamos = sequelize.define('prestamos', {
        numeroPedido: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Autoincremento para el número de pedido
        },
        codigoLibro: {
            type: Sequelize.INTEGER
        },
        codigoUsuario: {
            type: Sequelize.INTEGER
        },
        fechaSalida: {
            type: Sequelize.DATE // Usamos DATE para Fecha/Hora
        },
        fechaMaximaDevolucion: {
            type: Sequelize.DATE // Usamos DATE para Fecha/Hora
        },
        fechaDevolucion: {
            type: Sequelize.DATE // Usamos DATE para Fecha/Hora
        }
    });

    return Prestamos;
};
