module.exports = {
  database: {
    mongodb: {
      db: 'mongodb://127.0.0.1/mobile_dev',
      dbName: 'hello-world',
      defaultLimit: 1000
    },

    mysql: {
      host: '127.0.0.1',
      port: 6612,
      database: 'hello-world',
      username: 'root',
      password: '*'
    },
    
    redis: {
      port: 6379,
      host: '127.0.0.1',
      options: {
        password: '*' 
      }
    },

    elasticsearch: {
      host: 'http://127.0.0.1:9200',
      log: 'error'
    }
  },

  mongoose: {
    schemaConfig: {
      autoIndex: true
    }
  },

  loggerDir: './logs', 

  allowedOrigins: [
  ],
  
  httpProxy: {
  },
}

