module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("Orders", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: true
        },
        proof_payment: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ammount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        verification: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false
        }
  }, {
        tableName: 'orders',
        timestamps: true
    });

    return Orders;
}
