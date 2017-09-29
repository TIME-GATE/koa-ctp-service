const config = require('../config')
const redis = require('redis')
const redisClient = redis.createClient(config.database.redis.port, config.database.redis.host, config.database.redis.options)

module.exports = redisClient

redisClient.on('error', (err) => {
  console.log(err)
})

/**
 * 写入缓存 用 JSON.stringify 转换后写入缓存
 * @param {String} key 缓存使用的 cacheKey
 * @param {Object} value 需要被缓存的值
 * @param {expiresIn} Number 过期时间
 **/
module.exports.writeCache = (key, value, expiresIn) => {
  return new Promise((resolve, reject) => {
    redisClient.set(key, JSON.stringify(value), (err, value) => {
      if(err) return reject(err)
      try {
        value = value 
      } catch(error) {
        value = null
        return reject(error)
      }
      if(expiresIn) redisClient.expire(key, expiresIn)
      resolve(value)
    })
  })
}
/**
 * 读取缓存, 并用 JSON.parse 转换
 * @param {String} key
 **/
module.exports.readCache = function(key) {
  return new Promise(function(resolve, reject) {
    redisClient.get(key, function(err, value) {
      if (err) return reject(err)
      try {
        value = value && JSON.parse(value)
      } catch(error) {
        value = null
        return reject(error)
      }
      resolve(value)
    })
  })
}
 /**
 * 读取缓存 HASH, 返回Obj
 * @param {String} key 
 **/

module.exports.readHashCache = function(key) {
  return new Promise(function(resolve, reject) {
    redisClient.hgetall(key, function(err, obj) {
      if (err) return reject(err)
      resolve(obj)
    })
  })
}
 /**
 * 写入缓存 HASH, 返回Obj
 * @param {String} key 
 * @param {Object} value
 **/
module.exports.readHashCache = function(key, obj) {
  redisClient.hmset(key, obj,function(err, res) {
    if(err)console.log(err)
  })
}
