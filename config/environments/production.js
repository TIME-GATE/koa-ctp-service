module.exports = {
  database: {
    mongodb: {
      db: 'mongodb://101.132.32.250/mobile_dev',
      dbName: 'hello-world',
      defaultLimit: 1000
    },
    
    mysql: {
      host: '101.132.32.250',
      port: 3306,
      database: 'hello-world',
      username: 'admin',
      password: '*' 
    },
 
    redis: {
      host: '101.132.32.250',
      port: 6379,
      options: {}
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
  
  clientSignToken: {
    web: "ytxbdadp5a3o1c7yvXRbMX7gVNFqEtwusd7qweb",
    ios: "ytxbdadp5a3o1c7yvXRbMX7gVNFqEtwusd7qios",
    android: "ytxp5a3o1c7yvXRbMX7gVNFqEtwusd7qand",
  },

  httpProxy: {
  },
}

