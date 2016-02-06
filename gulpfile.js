const gulp = require('gulp')
const plumber = require('gulp-plumber')
const mocha = require('gulp-mocha')

gulp.task('mocha', () => {
  return gulp
    .src(['test/**/*.js'])
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec'
    }))
})

gulp.task('watch', () => {
  gulp.watch(['lib/**/*.js', 'test/**/*.js'], ['mocha'])
})

gulp.task('default', ['mocha', 'watch'])
