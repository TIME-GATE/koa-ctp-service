const gulp = require('gulp')
const jshint = require('gulp-jshint')
const nodemon = require('gulp-nodemon')

gulp.task('watch', () => {
  gulp.watch(['api/**', 'config/**', 'lib/**', 'util/**', 'app.js']);
})

gulp.task('jshint', () => {
  gulp.src(['api/**', 'config/**', 'util/**', 'app.js'])
  .pipe(jshint({
    "undef": true,
    "unused": true,
    "predef": [ "MY_GLOBAL" ], 
    "esversion": 7,
    "asi": true,
    "latedef": true,
    "curly": true
  }))
  .pipe(jshint.reporter('default')) 
})

gulp.task('dev', () => {
  nodemon({
    script: './app.js',
    ext: 'js',
    ignore: ['./node_modules']
  }).on('restart', () => {
    console.log('restart')  
  })
})

gulp.task('serve', ['watch', 'dev'])

gulp.task('default', ['serve'])
