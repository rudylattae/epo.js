var gulp = require('gulp'),
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
    all: [ 'gulpfile.js', './tote.js' ],
    dist: './www/dist'
};


gulp.task('lint', function() {
    return gulp.src(paths.src)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bump', function() {
    return gulp.src(paths.pkg)
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('tag', function () {
    var pkg = require(paths.pkg),
        ver = 'v' + pkg.version,
        msg = 'Release ' + v;

    return gulp.src('./')
        .pipe(git.commit(msg))
        .pipe(git.tag(v, msg))
        .pipe(git.push('origin', 'master', '--tags'))
        .pipe(gulp.dest('./'));
});

gulp.task('package', function() {
    return gulp.src(paths.src)
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest(paths.dist))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('dev', ['lint', 'package'], function() {
    gulp.watch(paths.all, ['lint', 'package']);
});

gulp.task('default', ['package']);
gulp.task('release', ['tag']);