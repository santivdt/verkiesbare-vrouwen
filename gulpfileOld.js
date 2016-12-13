var gulp = require('gulp'),
  sass = require('gulp-sass'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch'),
  util = require('gulp-util'),
  jshint = require('gulp-jshint'),
  sourcemaps = require('gulp-sourcemaps'),
  livereload = require('gulp-livereload'),
  notify = require("gulp-notify"),
  inject = require('gulp-inject'),
  concat = require('gulp-concat'),
  bower = require('gulp-bower'),
  jade = require('gulp-jade'),
  runSequence = require('run-sequence');


//Config
var config = {
  build: './build'
};

//Tasks

// This will run in this order:
// * connect
// * watch
// * bower, javascripts, sass in parallel
// * html
// * Finally call the callback function
gulp.task('default', function(callback) {
  runSequence('connect', 'watch',
    ['javascripts', 'sass'],
    'html',
    callback);
});

//the jsHint task
gulp.task('jshint', function(){
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Watch files for dev mode and reload when changed
gulp.task('watch', function() {
  // Create LiveReload server
  livereload({ start: true });
  livereload.listen();
  gulp.watch('src/js/**/*.js', ['jshint', 'javascripts']);
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.jade', ['jade']);
});

// CONNECT: Connect to local server
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 4000
  })
});


// SASS
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.build + '/css'))
    .pipe(livereload());
});


// JAVASCRIPTS
gulp.task('javascripts', function(){
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(livereload());
});


// HTML
gulp.task('html', function(){
  var sources = gulp.src([config.build + '/js/**/*.js', config.build + '/css/**/*.css'], {read: false});

  return gulp.src('src/**/*.html')
    .pipe(gulp.dest(config.build))
    .pipe(livereload());
});
