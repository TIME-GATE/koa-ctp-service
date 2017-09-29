/**
 * schema 定义表集合
 * model 定义类方法、实例方法(DAO)、表关系
 */
const sequelize = require('../common/sequelize')

const AccountSchema = require('./schemas/account')
const Cacher = require('../common/cache')

const Account = sequelize.define('Account', AccountSchema, {
  tableName: 'account',
  instanceMethods: {},
  classMethods: {}
})

module.exports = Account

// 如果需要加入cache, 如下:
// module.exports = Cacher('Account', 5)
