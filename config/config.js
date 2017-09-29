const path = require('path')
const morgan = require('koa-morgan')
const fs = require('fs')

const env = process.env.NODE_ENV || 'development'
const configPath = path.join(__dirname, 'environments', env)

const config = require('./config.default.js')
const routes = require('./api_routes.js')
const envConfig = require(configPath)

const logStream = fs.createWriteStream(path.join(path.resolve(envConfig.loggerDir), ['share-api', '.log'].join('')))
const loggerFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" " - :response-time ms"'

module.exports = Object.assign(config, routes, envConfig, {
  NODE_ENV: env,
  logger: {
    access: () => morgan(loggerFormat, { stream: logStream })
  },
  env: {
    isDevelopment: () => {
      return env === 'development'
    },
    isTest: () => {
      return env === 'test'
    },
    isStaging: () => {
      return env === 'staging'
    },
    isProduction: () => {
      return env === 'production'
    }
  }
})
