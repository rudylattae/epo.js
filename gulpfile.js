'use strict';

var gulp = require('gulp'),
    exec = require('exec'),
    jshint = require('gulp-jshint'),
    bump = require('gulp-bump'),
    git = require('gulp-git'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    size = require('gulp-size'),
    pkg = require('./package.json');


var paths = {
    pkg: './package.json',
    src: './tote.js',
    allJs: [ './gulpfile.js', './tote.js', './www/spec/toteSpec.js' ],
    dist: './www/dist'
};


gulp.task('lint', function() {
    return gulp.src(paths.allJs)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bump', function() {
    return gulp.src(paths.pkg)
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('tag', function () {
    var version = 'v' + pkg.version,
        message = 'Release ' + version;

    return gulp.src('./')
        .pipe(git.commit(message))
        .pipe(git.tag(version, message))
        .pipe(git.push('origin', 'master', '--tags'))
        .pipe(gulp.dest('./'));
});

gulp.task('package', ['lint'], function() {
    return gulp.src(paths.src)
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest(paths.dist))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('website', function() {
    exec(['harp', 'compile', 'www', '_www'], function(err, out) {
        if (err) throw err;
        process.stdout.write( out );
    });
});

gulp.task('dev', ['package'], function() {
    gulp.watch(paths.allJs, ['package']);
});

gulp.task('default', ['package', 'website']);
gulp.task('release', ['tag']);
