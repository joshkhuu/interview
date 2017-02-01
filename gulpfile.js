var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    gutil = require('gulp-util'),
    minifyCSS = require('gulp-minify-css'),
    webserver = require('gulp-webserver');

var src = './process',
    app = './builds/app';

gulp.task('js', function() {
  return gulp.src( src + '/js/app.js' )
    .pipe(browserify({
      transform: 'reactify',
      debug: true
    })
    .on('error', function (err) {
      console.error('Error!', err.message);
    }))
    .pipe(gulp.dest(app + '/js'));
});

gulp.task('html', function() {
  gulp.src( app + '/**/*.html');
});

gulp.task('css', function() {
  gulp.src('./process/sass/style.scss')
    .pipe(compass({
      css: 'process/css',
      sass: 'process/sass',
      image: 'builds/app/images',
      style: 'compressed'
      })
      .on('error', gutil.log))
    .pipe(minifyCSS())
    .pipe(gulp.dest('builds/app/css'))
});

gulp.task('watch', function() {
  gulp.watch( src + '/js/**/*', ['js']);
  gulp.watch( src + '/*.scss', ['css']);
  gulp.watch([ app + '/**/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src( app + '/')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
