module.exports = (sequelize, Sequelize) => {
    const DetallesPedido = sequelize.define('detalles_pedido', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pedido_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'pedidos',
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
        }
    });

    return DetallesPedido;
};
