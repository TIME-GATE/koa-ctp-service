const crypto = require('crypto')

class AuthCode {
  
  constructor(key = 'web') {
    this.key = key 
  }

  generateKey(keyStr) {
    const hash = crypto.createHash('md5')
    return hash.update(new Buffer(keyStr, 'utf8')).digest('hex')
  }

  authcode(data, operation, key) {

    key = this.generateKey(key || this.key)
    const cipher = crypto.createCipher('aes192', key)
    try {
      switch (operation) {
        case 'DECODE':
          const decipher = crypto.createDecipher('aes192', key)
          return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8') 
        case 'ENCODE':
          const cipher = crypto.createCipher('aes192', key)
          return cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
      }
    } catch (err) {
      return 'DECODE' === operation ? ':::' : null
    }   
  
  }

  decode(str, key) {
    return this.authcode(str, 'DECODE', key) 
  }

  encode(str, key) {
    return this.authcode(str, 'ENCODE', key)
  }

}

module.exports = new AuthCode()
