const { Op } = require("sequelize");
const config = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const userInfo = require('./user')
const adminInfo = require('./adminInfo')
const banner_images = require('./banner_images')
const homeBannerVideo = require('./banner_video')
const header_links = require('./header_links')



console.log('ENTER IN DB FILE')
console.log(config, "Config")

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});

console.log('Connecting to the DATABASE...');

sequelize.authenticate().then(() => {
    // console.log(config);
    console.log('Connection has been established successfully.............');
}).catch((err) => {
    console.log('Unable to connect to the database:----------', err);
})

sequelize.sync({ force: false }).then(() => {
    console.log("yes re-sync done!!!!!!")
});


const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.userInfo = userInfo(sequelize, Sequelize)
db.adminInfo = adminInfo(sequelize, Sequelize)
db.banner_images = banner_images(sequelize, Sequelize)
db.homeBannerVideo = homeBannerVideo(sequelize, Sequelize)
db.header_links = header_links(sequelize, Sequelize)



db.Op = Op;



module.exports = db;
