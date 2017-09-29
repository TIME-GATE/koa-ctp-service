const CronJob = require('cron').CronJob

/**
* 定时离线/实时推送
*/
class PushMessage {
  constructor() {
    new CronJob('00 00 01 * * *', async () => {
      try {
        await this.execComposeData()
        await this.execConnectServer()
        await this.execPushMessage()
      } catch (error) {
        console.log(error)
      }       
    }, null, true, 'Asia/Shanghai')
  }

  async execComposeData() {
  
	}

  async execConnectServer() {
  
	}

  async execPushMessage() {
  
	}

}

module.exports = new PushMessage()
