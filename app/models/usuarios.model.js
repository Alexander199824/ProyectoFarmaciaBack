const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define('usuarios', {
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
        contraseña: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        tipo_usuario: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['cliente', 'administrador', 'vendedor']]
            }
        },
        latitud: {
            type: Sequelize.NUMERIC(9, 6)
        },
        longitud: {
            type: Sequelize.NUMERIC(9, 6)
        },
        rol_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        imagen_perfil: {
            type: DataTypes.BLOB 
        }
    });

    return Usuarios;
};
