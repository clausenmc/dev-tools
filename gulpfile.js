var  gulp = require("gulp"),
     less = require('gulp-less'),
     cssnano = require('gulp-cssnano'),
     coffee = require('gulp-coffee'),
     path = require('path'),
     util = require('gulp-util'), 
     nodemon = require('gulp-nodemon'),
     refresh = require('gulp-refresh');
 
gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(cssnano({
      zindex: false,
      discardComments: { removeAll: true },
      removeEmpty: true,
      discardDuplicates: true
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('coffee', function() {
  gulp.src('./coffee/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', util.log))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', ['less','coffee'], function () {
  var watcher = gulp.watch('./less/**/*.less', ['less']);
  var watcher = gulp.watch('./coffee/**/*.coffee', ['coffee']);
});

gulp.task('nodemon', function runNodemon(cb) {
    var started = false;
    return nodemon({
        script: 'public/js/express.js',
        watch : ['js/'],
        ext : "js"
    }).on('start', function start() {
        // to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function () {
            setTimeout(refresh.reload,1000)
    });
});

gulp.task('start', ['less','coffee','nodemon']);