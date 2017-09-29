/**
 * Created by Joseph on 18/09/2017. 
 * C++ plugin for Node.js
 */
const Api = require('koa-hooks').Api
const VerbService = require('../../services/verb.js')

class VerbApi extends Api {
  constructor(ctx, next, cb){
    super(ctx, next, cb)
    this.addHooks([
      'verbGetOnThisRequest.beforeVerbCheckLogin',
      'verbPostOnThisRequest.beforeVerbCheckLogin',
      'verbPutOnThisRequest.beforeVerbCheckLogin',
      'verbDeleteOnThisRequest.beforeVerbCheckLogin',
    ])
  }
  
  async beforeVerbCheckLogin(ctx, next, cb) {
    const data = await VerbService.beforeVerbCheckLogin(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async verbGetOnThisRequest(ctx, next, cb) {
    const data = await VerbService.verbGetOnThisTest(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async verbPostOnThisRequest(ctx, next, cb) {
    const data = await VerbService.verbPostOnThisTest(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async verbPutOnThisRequest(ctx, next, cb) {
    const data = await VerbService.verbPutOnThisTest(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async verbDeleteOnThisRequest(ctx, next, cb) {
    const data = await VerbService.verbDeleteOnThisTest(ctx, next)
    data ? cb(ctx, data) : await next()
  }

}

module.exports = (ctx, next, cb) => new VerbApi(ctx, next, cb)

