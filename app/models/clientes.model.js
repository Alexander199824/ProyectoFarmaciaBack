module.exports = (sequelize, Sequelize) => {
    const Clientes = sequelize.define('clientes', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING,
            unique: true
        },
        direccion: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        latitud: {
            type: Sequelize.NUMERIC(9, 6)
        },
        longitud: {
            type: Sequelize.NUMERIC(9, 6)
        }
    });

    return Clientes;
};
