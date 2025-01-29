const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const userInfo = sequelize.define("userInfo", {
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
            type: DataTypes.INTEGER,
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

    return userInfo
}