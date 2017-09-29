const cache = require('sequelize-redis-cache')
const redis = require('redis')

const mysqlConfig = require('../config').database.mysql
const redisConfig = require('../config').database.redis
const sequelize = require('./sequelize')

const redisClient = redis.createClient(redisConfig.port, redisConfig.host, redisConfig.options)

module.exports = (modelName, expiredTime) => {
  return cache(sequelize, redisClient).model(modelName).ttl(expiredTime || 5)
}