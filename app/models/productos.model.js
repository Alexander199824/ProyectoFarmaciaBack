module.exports = (sequelize, DataTypes) => {
    const Productos = sequelize.define('productos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        descripcion: {
            type: DataTypes.TEXT
        },
        precio: {
            type: DataTypes.NUMERIC(10, 2)
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categorias',
                key: 'id'
            }
        },
        proveedor_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'proveedores',
                key: 'id'
            }
        },
        imagen: {
            type: DataTypes.BLOB 
        }
    });

    return Productos;
};
