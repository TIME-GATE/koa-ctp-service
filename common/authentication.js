/**
 * 基础的接口保护 token需定期更新
 */
const crypto = require('crypto')

const { clientSignToken } = require('../config')
const { signData } = require('../common/helper')

class SignParams {
  constructor(params, token) {
    switch (token) {
      case 'web':
        this.token = clientSignToken[token]
        break
      case 'ios':
        this.token = clientSignToken[token]
        break
      case 'android':
        this.token = clientSignToken[token]
        break
      default:
        this.token = clientSignToken['web']
        break
    }
    this.params = params || {}
  }
  
  signParams() {
    const paramsToString = JSON.stringify(this.params) + Object.keys(this.params).toString() + this.token
    return crypto.createHash('md5').update(new Buffer(paramsToString, 'utf8')).digest('hex')
  }

}

module.exports.signParams = (params, token) => {
  const sign = new SignParams(params, token)
  
  switch (token) {
    case 'web':
      return sign.signParams()
    default:
      return sign.signParams()
  }

}
