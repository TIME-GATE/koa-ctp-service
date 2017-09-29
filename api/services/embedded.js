/**
 * Created by Joseph on 18/09/2017. 
 * C++ plugin for Node.js
 * 
 * if we need run c++ code on node, this plugin is very userful for that 
 * 
 * Demo: just a demo for test
 * ParamsNocb: run c++ code if only pass Params
 * testFunctionNocb: run c++ code if only pass function
 * ParamsFunctionNocb: run c++ code if pass params and function
 */
const Models = require('../../models')
const { embeddedProxy } = require('../../common/http_proxy')
const Demo = require('../../build/Release/demo')
const ParamsNocb = require('../../build/Release/test_params_nocb')
const FunctionNocb = require('../../build/Release/test_function_nocb')
const ParamsFunctionNocb = require('../../build/Release/test_params_function_nocb')


class EmbeddedService {

  async beforeUnlockYourCplusJourney(ctx, next) {
    return !(ctx.request.body || ctx.request.query) ? { data: 'Traveling Lignt!' } : null
  }

  async unlockYourCplusJourney(ctx, next) {
    return { data: await Promise.resolve(Demo.hello('hello')) }
  }

  async testParamsNocb(ctx, next) {
    return { data: await Promise.resolve(ParamsNocb.add(12, 21)) }
  }

  async testFunctionNocb(ctx, next) {
    return { data: await embeddedProxy(FunctionNocb) }
  }

  async testParamsFunctionNocb(ctx, next) {
    return { data: await embeddedProxy(ParamsFunctionNocb, { data: 'mengqi' }) }
  }

}

module.exports = new EmbeddedService()