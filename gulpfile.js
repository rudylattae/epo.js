'use strict';

var gulp = require('gulp'),
  exec = require('gulp-exec'),
  jshint = require('gulp-jshint'),
  bump = require('gulp-bump'),
  git = require('gulp-git'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  size = require('gulp-size'),
  runSequence = require('run-sequence'),
  help = require('gulp-task-listing'),
  header = require('gulp-header'),
  wrap = require('gulp-wrap-umd'),
  pkg = require('./package.json');


var paths = {
  pkg: './package.json',
  src: './tote.js',
  allJs: [ './gulpfile.js', './tote.js', './www/spec/toteSpec.js' ],
  dist: './dist',
  spec: './spec'
};

var banner = ['/*!',
  '  <%= pkg.name %> v<%= pkg.version %> -- <%= pkg.description %>',
  '  <%= pkg.homepage %>',
  '  (c) 2014 <%= pkg.author %>, <%= pkg.license %> License',
  ' */',
  ''].join('\n');

var umdWrapper = ['//UMD', 
  '<%= contents %>',
  '// UMD'].join('\n');


gulp.task('lint', function() {
  return gulp.src(paths.allJs)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('package', ['package-umd', 'package-embed'], function() {
  // ...
});

gulp.task('package-umd', ['lint'], function() {
  return gulp.src(paths.src)
    .pipe(concat(pkg.name + '.js'))
    .pipe(size())
    .pipe(wrap({ namespace: 'tote', exports: 'tote' }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(paths.dist))
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(size())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('package-embed', ['lint'], function() {
  return gulp.src(paths.src)
    .pipe(concat(pkg.name + '-embed.js'))
    .pipe(size())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(paths.dist))
    .pipe(rename(pkg.name + '-embed.min.js'))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(size())
    .pipe(gulp.dest(paths.dist));
});


gulp.task('check-features', function() {
  return gulp.src('.')
    .pipe(exec('testem ci -l PhantomJS'));
});

gulp.task('check-compatibility', function() {
  return gulp.src('.')
    .pipe(exec('testem ci --parallel 5'));
});


gulp.task('publish-dist', function() {
  return gulp.src('.')
    .pipe(exec('cp -r ' + paths.dist + ' ./www'));
});

gulp.task('publish-spec', function() {
  return gulp.src('.')
    .pipe(exec('cp -r ' + paths.spec + ' ./www'));
});

gulp.task('build-website', function() {
  return gulp.src('.')
    .pipe(exec('harp compile ./www ./_www'));
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

// show task list
gulp.task('help', help);


// development 
gulp.task('develop', ['package', 'check-features'], function() {
  gulp.watch(paths.allJs, ['package', 'check-features']);
});


// should only be run on master branch
gulp.task('prepare', function(done) {
  runSequence('package', 'check-compatibility', 'bump', 'tag', done);
});

gulp.task('release', function(done) {
  runSequence('check-compatibility', ['publish-dist', 'publish-spec'], 'build-website', done);
});

// defaul task
gulp.task('default', function(done) {
  runSequence('package', 'check-features', done);
});
