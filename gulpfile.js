'use strict';

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    gutil = require('gulp-util');

gulp.task('styles', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});
gulp.task('scripts', function() {
    return gulp.src('./source-js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({compact: true}))
        .pipe(concat('main.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', ['styles', 'scripts'], function () {
    gulp.watch('./scss/**/*.scss', ['styles']);
    gulp.watch('./source-js/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts'], function () {

});