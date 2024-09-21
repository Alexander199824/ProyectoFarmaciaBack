module.exports = (sequelize, Sequelize) => {
    const Proveedores = sequelize.define('proveedores', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contacto: {
            type: Sequelize.STRING
        }
    });

    return Proveedores;
};
