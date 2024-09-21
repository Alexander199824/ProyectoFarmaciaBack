module.exports = (sequelize, Sequelize) => {
    const VentasLocales = sequelize.define('ventas_locales', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        local_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'locales',
                key: 'id'
            }
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
        precio: {
            type: Sequelize.NUMERIC(10, 2),
            allowNull: false
        },
        fecha_venta: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return VentasLocales;
};
