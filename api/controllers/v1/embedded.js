/**
 * Created by Joseph on 18/09/2017. 
 * C++ plugin for Node.js
 */
const Api = require('koa-hooks').Api
const EmbeddedService = require('../../services/embedded.js')

class EmbeddedApi extends Api {
  constructor(ctx, next, cb){
    super(ctx, next, cb)
    this.addHooks([
      'unlockYourCplusJourney.beforeUnlockYourCplusJourney'
    ])
  }

  async beforeUnlockYourCplusJourney(ctx, next, cb) {
    const data = await EmbeddedService.beforeUnlockYourCplusJourney(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async unlockYourCplusJourney(ctx, next, cb) {
    const data = await EmbeddedService.unlockYourCplusJourney(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async testParamsNocb(ctx, next, cb) {
    const data = await EmbeddedService.testParamsNocb(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async testFunctionNocb(ctx, next, cb) {
    const data = await EmbeddedService.testFunctionNocb(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async testParamsFunctionNocb(ctx, next, cb) {
    const data = await EmbeddedService.testParamsFunctionNocb(ctx, next)
    data ? cb(ctx, data) : await next()
  }

}

module.exports = (ctx, next, cb) => new EmbeddedApi(ctx, next, cb)

