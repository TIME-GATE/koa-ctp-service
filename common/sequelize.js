const Sequelize = require('sequelize')
const config = require('../config').database.mysql
const debug = require('debug')('mobile-service:sequelize')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4'
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: true
  },
  logging: debug
})

module.exports = sequelize
