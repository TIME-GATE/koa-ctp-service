const Koa = require('koa')
const router = require('koa-router')()

const compress = require('koa-compress')
const bodyParser = require('koa-bodyparser')

const csrf = require('koa-csrf')
const cors = require('koa-cors')

const Helpers = require('./common/helper')
const sequelize = require('./common/sequelize')
const config = require('./config')
const authorization = require('./api/middlewares/authorization')

// 同步数据库
//sequelize.sync()

//require('./schedules')
//require('./models')

const app = new Koa()

config.routes.map((route) => {
  try {
    router[route.verb.toLowerCase()](route.path, async (ctx, next) => {
      const { modules, method } = Helpers.toFn(route.fn, ctx, next, Helpers.response)
      await modules[method].call(modules, ctx, next, Helpers.response)
    }) 
  } catch(err) {
    ctx.throw(400, err)
  }
})

/**
 * cors: 允许跨域
 * config.logger.access: 开启请求日志
 * bodyParser: 参数解析 
 * compress: 压缩数据包
 * authorization 认证中间件
 * router: 请求路由
 */
app.use(cors())
app.use(config.logger.access())
app.use(bodyParser())
app.use(authorization)
app.use(router.routes())
app.use(router.allowedMethods())
app.use(compress())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

process.on('uncaughtException', (exception) => {
  console.log(exception)
})

process.on('unhandledRejection', (reason) => {
  console.error(reason)
})

app.listen(process.env.PORT || 3000)

module.exports = app
