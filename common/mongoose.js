/**
 * 加载mongodb
 */

const mongoose = require('mongoose')
const debug = require('debug')('mobile-service:model')
const autoIncrement = require('mongoose-auto-increment')

const config = require('../config')

const connection = mongoose.connect(config.database.mongodb.db, (err) => {
  if(err) {
    console.log('connect to %s error: ', config.database.mongodb.db, err.message)
    process.exit(1)
  }
})

autoIncrement.initialize(connection)

if(!config.env.isProduction()) {
  mongoose.set('debug', true)
}

models.exports = mongoose
