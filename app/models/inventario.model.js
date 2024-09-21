module.exports = (sequelize, Sequelize) => {
    const Inventario = sequelize.define('inventario', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        producto_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'productos',
                key: 'id'
            }
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fecha_vencimiento: {
            type: Sequelize.DATE
        },
        ubicacion: {
            type: Sequelize.STRING
        }
    });

    return Inventario;
};
