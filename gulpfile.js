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
    dist: './dist',
    spec: './spec'
};


gulp.task('lint', function() {
    return gulp.src(paths.allJs)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('package', ['lint'], function() {
    return gulp.src(paths.src)
        .pipe(concat(pkg.name + '.js'))
        .pipe(size())
        .pipe(gulp.dest(paths.dist))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest(paths.dist));
});


gulp.task('check-features', function(cb) {
    exec(['testem', 'ci', '-l', 'PhantomJS'], function(err, out) {
        process.stdout.write( out );
        if (err) throw err;
        cb();
    });
});

gulp.task('check-compatibility', function(cb) {
    exec(['testem', 'ci', '--parallel', '5'], function(err, out) {
        process.stdout.write( out );
        if (err) throw err;
        cb();
    });
});


gulp.task('publish-dist', function(cb) {
    exec(['cp', '-r', paths.dist, './www'], function(err, out) {
        process.stdout.write( out );
        if (err) throw err;
        cb();
    });
});

gulp.task('publish-spec', function(cb) {
    exec(['cp', '-r', paths.spec, './www'], function(err, out) {
        process.stdout.write( out );
        if (err) throw err;
        cb();
    });
});

gulp.task('build-website', function(cb) {
    exec(['harp', 'compile', 'www', '_www'], function(err, out) {
        process.stdout.write( out );
        if (err) throw err;
        cb();
    });
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


// development 
gulp.task('develop', ['package', 'check-features'], function() {
    gulp.watch(paths.allJs, ['package', 'check-features']);
});


// should only be run on master branch
gulp.task('prepare', ['package', 'check-compatibility', 'bump', 'tag']);
gulp.task('release', ['check-compatibility', 'publish-dist', 'publish-spec', 'build-website']);


// defaul task
gulp.task('default', ['package', 'check-features', 'build-website']);

