const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const banner_images = sequelize.define("banner_images", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        admin_id: {
            type: DataTypes.INTEGER
        },
        banner_image: {
            type: DataTypes.STRING
        },
        no_of_likes: {
            type: DataTypes.STRING
        },
        no_of_shares: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        rank: {
            type: DataTypes.BIGINT
        },
        status: {
            type: DataTypes.STRING
        }
    },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })

    return banner_images
}