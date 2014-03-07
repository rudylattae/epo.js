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
  others: ['./gulpfile.js', './spec/toteSpec.js'],
  dist: './dist',
  spec: './spec'
};

var banner = ['/*!',
  '  <%= pkg.name %> v<%= pkg.version %> -- <%= pkg.description %>',
  '  <%= pkg.homepage %>',
  '  (c) 2014 <%= pkg.author %>, <%= pkg.license %> License',
  ' */',
  ''].join('\n');


gulp.task('package-umd', function() {
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

gulp.task('package-embed', function() {
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

gulp.task('lint', function() {
  return gulp.src([paths.dist].concat(paths.others))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});


// run specs in webkit only
gulp.task('check-one', function() {
  return gulp.src('.')
    .pipe(exec('testem ci -l PhantomJS'));
});

// run specs in all available browsers
gulp.task('check-all', function() {
  return gulp.src('.')
    .pipe(exec('testem ci --parallel 5'));
});

// copy dist dir (packages) to website source
gulp.task('copy-dist', function() {
  return gulp.src('.')
    .pipe(exec('cp -r ' + paths.dist + ' ./www'));
});

// copy spec dir (technical + feature specs) to website source
gulp.task('copy-spec', function() {
  return gulp.src('.')
    .pipe(exec('cp -r ' + paths.spec + ' ./www'));
});

// generate static website in staging repo
// NOTE: in this case, _gh-pages is a clone of the gh-pages branch
gulp.task('stage-website', function() {
  return gulp.src('.')
    .pipe(exec('harp compile ./www ./_gh-pages'));
});

gulp.task('bump-version', function() {
  return gulp.src(paths.pkg)
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('tag-release', function () {
  var version = 'v' + pkg.version,
    message = 'Release ' + version;

  return gulp.src('./')
    .pipe(git.commit(message))
    .pipe(git.tag(version, message))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});


// help: show task list
// =====================
gulp.task('help', help);


// development 
// ============
gulp.task('develop', ['package'], function() {
  gulp.watch([paths.pkg, paths.src, paths.spec].concat(paths.others), ['package']);
});


// packaging
// ==========
gulp.task('package', function(done) {
  runSequence('package-embed', 'package-umd', 'lint', done);
});


// shipping
// =========

// ** next or master only **
gulp.task('prepare', function(done) {
  runSequence('package', 'check-all', ['copy-dist', 'copy-spec'], done);
});

// ** master only **
gulp.task('release', function(done) {
  runSequence('bump-version', 'tag-release', done);
});

// ** master only **
gulp.task('stage', ['stage-website'], function() {});


// default
// ========
gulp.task('default', function(done) {
  runSequence('package', 'check-one', done);
});
