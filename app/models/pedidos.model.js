module.exports = (sequelize, Sequelize) => {
    const Pedidos = sequelize.define('pedidos', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        },
        fecha_pedido: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        estado: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['pendiente', 'enviado', 'entregado', 'cancelado']]
            }
        }
    });

    return Pedidos;
};