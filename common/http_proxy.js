const request = require('request')
const iconv = require('iconv-lite')
const config = require('../config')
const { signData } = require('../common/helper')

/**
 * 统一 resolve 处理 以code处理结果
 */
module.exports.httpProxy = (proxyUrl, params, options = {}) => {
  return new Promise((resolve, reject) => {
    request.post({
      url: proxyUrl,
      form: params,
      headers: options
    }, (err, res, body) => {
      if (err) return resolve({ code: -1, message: '请求失败' })
      try {
        resolve({ data: JSON.parse(body.trim()) })
      } catch(err) {
        resolve({ code: -1, message: '解析失败' })
      }
    })
  })
}

module.exports.embeddedProxy = (cb, params) => {
  return new Promise((resolve, reject) => {
    try {
      return cb((data) => { resolve(data) }, params)
    } catch (err) {
      return resolve({ data: "调用失败", code: -1 })
    }
  })
}
