
const API_ROUTE = '../api/controllers/v1/'

const Helpers = {}

module.exports = Helpers

Helpers.toFn = (api, ctx, next, cb) => {
  try {
    let [moduleName, methodName] = api.split('.')
    return { modules: require(`${API_ROUTE}${moduleName}`)(ctx, next, cb), method: methodName }
  } catch(err) { 
    throw err   
  }
}

Helpers.response = (ctx, data = {}) => {
  switch (data.code ? data.code : 0) {
    case 0:
      ctx.response.status = 200
      break
    default:
      ctx.response.status = 400
      break
  }

  ctx.body = {
    code: data.code || 0,
    message: data.message || '请求成功',
    data: data.data || {} 
  }
}