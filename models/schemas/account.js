/**
 * user account 
 */

const Sequelize = require('sequelize')

module.exports = {
  uid: {
    type: Sequelize.INTEGER,
    field: 'id',
    unique: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  nickname: {
    type: Sequelize.STRING,
    field: 'nickname'
  },
  avatar: {
    type: Sequelize.STRING,
    field: 'avatar'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
  password: {
    type: Sequelize.STRING,
    field: 'password'
  },
  phone: {
    type: Sequelize.STRING(28),
    primaryKey: true,
    field: 'phone'
  },
  realname: {
    type: Sequelize.STRING,
    field: 'realname'
  },
  gender: {
    type: Sequelize.ENUM,
    values: ['unknown', 'male', 'female'],
    field: 'gender',
    defaultValue: 'unknown'
  },
  // 保留字段  
  default1: {
    type: Sequelize.STRING,
    field: 'default1'
  },
  default2: {
    type: Sequelize.STRING,
    field: 'default2'
  },
  default3: {
    type: Sequelize.STRING,
    field: 'default3'
  } 
}
