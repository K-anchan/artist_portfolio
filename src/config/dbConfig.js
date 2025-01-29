const dotenv = require('dotenv');
dotenv.config();

let dbLocalInfo = {
    HOST: 'localhost',
    USER: 'root',
    // PASSWORD: 'Password@123',
    PASSWORD: "root@123",
    dialect: "mysql",
    pool: {
        max: 20,
        min: 0,
        acquire: 60000,
        idle: 10000
    },
};

if (process.env.NODE_ENV == "development") {
    console.log(222)
    dbLocalInfo.DB = "artist_portfolio"
}
else {
    console.log(244)
    dbLocalInfo.DB = "artist_portfolio"
}

module.exports = dbLocalInfo;

