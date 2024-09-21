module.exports = (sequelize, Sequelize) => {
    const Categorias = sequelize.define('categorias', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Categorias;
};
