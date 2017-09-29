/**
 * Created by Joseph on 18/09/2017.
 * 认证中间件
 * 1 验证用户合法性
 * 2 校验参数
 */
const authcode = require('../../common/authcode')
const Authentication = require('../../common/authentication')
const { readCache } = require('../../common/redis')
const config = require('../../config')
const WHITELIST = config.allowedOrigins

module.exports = async function(ctx, next) {
  const allParams = Object.assign({}, ctx.query, ctx.request.body)
  const clientSignature = ctx.header.sign || ''
  const serverSignature = Authentication.signParams(allParams, ctx.header.clienttype)
  const authorization = ctx.header.authorization
  const auth = authcode.decode(authorization, ctx.header.clienttype).split(':')

  // app做签名校验 白名单与微信端默认信任
  if(serverSignature === clientSignature || ctx.header.clienttype === 'web') {
    const token = await readCache(`${auth[0]}:${auth[1]}`)
    token && token ===  authorization ? (ctx.currentAccount = auth[0]) : (ctx.currentAccount = null)
    return next()
  }

  ctx.response.status = 403
  const errors = { message: '您没有权限访问', code: 1, data: {} }
    
  if(config.env.isDevelopment()) {
    errors.data.clientSignature = clientSignature
    errors.data.serverSignature = serverSignature
  }

  ctx.body = errors
}
