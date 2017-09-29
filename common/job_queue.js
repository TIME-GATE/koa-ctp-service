/**
 * 后台任务队列 分布式最终一致性
 */
const kue = require('kue')
const util = require('util')
const config = require('../config')

const queuePrefix = config.env.isProduction() ? 'mobile-q' : `mobile-q-${config.NODE_ENV}`

const queue = kue.createQueue({
  prefix: queuePrefix,
  redis: config.database.redis
})

queue.watchStuckJobs()

queue.active( function( err, ids ) {
  ids.forEach( function( id ) {
    kue.Job.get( id, function( err, job ) {
      if (err) {
        err.message = 'kue load error'
        console.error(err)
      }
      if (job) job.inactive()
    })
  })
})

queue.on('job enqueue', function(id, type){
  console.log('Job %s got queued of type %s', id, type);
})

queue.on('job complete', function(id){
  kue.Job.get(id, function(err, job){
    if (err) return;
    job.remove(function(err){
      if (err) throw err;
      console.log('Removed completed job of type %s with id #%d \n', job.type, job.id);
    });
  });
})

queue.on('error', function(err) {
  err.message = 'executing queue error';
  console.log(err);
});

module.exports = queue
