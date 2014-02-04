var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    bump = require('gulp-bump'),
    git = require('gulp-git'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    size = require('gulp-size'),
    pkg = require('./package.json');


gulp.task('lint', function() {
    return gulp.src('./tote.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bump', function() {
    return gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('tag', function () {
    var pkg = require('./package.json'),
        ver = 'v' + pkg.version,
        msg = 'Release ' + v;

    return gulp.src('./')
        .pipe(git.commit(msg))
        .pipe(git.tag(v, msg))
        .pipe(git.push('origin', 'master', '--tags'))
        .pipe(gulp.dest('./'));
});

gulp.task('package', function() {
    return gulp.src('./tote.js')
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest('./www/dist'))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest('./www/dist'));
});

gulp.task('default', ['package']);