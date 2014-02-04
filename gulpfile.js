var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    pkg = require('./package.json');


gulp.task('package', function() {
    return gulp.src('tote.js')
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest('./www/dist'))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./www/dist'));
});

gulp.task('default', ['package'], function() {

});