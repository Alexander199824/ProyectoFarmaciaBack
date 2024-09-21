module.exports = (sequelize, Sequelize) => {
    const Transacciones = sequelize.define('transacciones', {
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
        metodo_pago: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['paypal', 'tarjeta', 'efectivo']]
            }
        },
        estado_transaccion: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['pendiente', 'completado', 'fallido']]
            }
        },
        fecha_pago: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return Transacciones;
};