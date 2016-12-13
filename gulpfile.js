var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    jade   = require('gulp-jade'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence');


// This will run in this order:
// * connect
// * watch
// * jade and sass in parallel
// * Finally call the callback function
gulp.task('default', function(callback) {
  runSequence('connect', 'watch', 'jade', 'build-css',
    callback);
});

// Watch files for dev mode and reload when changed
gulp.task('watch', function() {
  // Create LiveReload server
  livereload({ start: true });
  livereload.listen();
  gulp.watch('source/styles/*.scss', ['build-css']);
  gulp.watch('source/*.jade', ['jade']);
});

// CONNECT: Connect to local server
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    port: 4000
  })
});


/* SASS task */
gulp.task('build-css', function() {
  return gulp.src('source/styles/**/*.scss')
    .pipe(sourcemaps.init())  // Process the original sources
    .pipe(sass())
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest('public/styles/'))
    .pipe(livereload());
});

/* JADE task */
gulp.task('jade', function() {
  return gulp.src('source/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('public'))
    .pipe(livereload());
});

// gulp.task('watch', function() {
//   gulp.watch('source/styles/**/*.scss', ['build-css']);
//   gulp.watch('source/*.jade', ['jade']);
// });
