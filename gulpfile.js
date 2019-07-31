'use strict';

const gulp      = require('gulp'),
      htmlmin   = require('gulp-htmlmin'),
      sass      = require('gulp-sass'),
      cleanCSS  = require('gulp-clean-css');


function minify_html(cb) {
  gulp.src('src/**/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('dist/'));
  cb();
}
gulp.task(minify_html);

function sassToCss(cb) {
  gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
  cb();
}
gulp.task(sassToCss);

function watchFiles() {
  gulp.watch('src/**/*.html', minify_html);
  gulp.watch('src/**/*.scss', sassToCss);
}

exports.default = gulp.series( gulp.parallel(minify_html, sassToCss), watchFiles);
