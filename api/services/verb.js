/**
 * Created by Joseph on 18/09/2017.
 * test get/post/put/delete 
 */
const Models = require('../../models')
const { readCache, writeCache } = require('../../common/redis')
const { Code, CodeMsg } = require('../../config')

class VerbService {

  async beforeVerbCheckLogin(ctx, next) {
    return !ctx.currentAccount ? { message: CodeMsg[10000], code: Code.NEED_LOGIN } : null
  }

  async verbGetOnThisTest(ctx, next) {
    return { data: 'GET' }
  } 

  async verbPostOnThisTest(ctx, next) {
    return { data: 'POST' }  
  }

  async verbPutOnThisTest(ctx, next) {
    return { data: 'PUT' }
  }

  async verbDeleteOnThisTest(ctx, next) {
    return { data: 'DELETE' }
  }

}

module.exports = new VerbService()
