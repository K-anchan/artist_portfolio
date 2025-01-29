const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const adminInfo = sequelize.define("adminInfo", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
        },
        mobile: {
            type: DataTypes.BIGINT,
            // allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            default: true
        }

    },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })

    return adminInfo
}