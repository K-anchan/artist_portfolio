const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const header_links = sequelize.define("header_links", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        link_name: {
            type: DataTypes.STRING
        },
        link_url: {
            type: DataTypes.STRING
        },
        template_name: {
            type: DataTypes.STRING
        },
    },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })

    return header_links
}