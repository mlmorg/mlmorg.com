var autoprefixer = require('gulp-autoprefixer');
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var rework = require('gulp-rework');
var reworkNpm = require('rework-npm');
var rimraf = require('rimraf');
var sequence = require('run-sequence');

gulp.task('clean', function clean(cb) {
  rimraf('./dist', cb);
});

gulp.task('compile-stylesheets', function compileStylesheets() {
  var reworkWithPlugins = rework.apply(null, [
    reworkNpm()
  ]);
  return gulp.src('app/stylesheets/**/*.css')
    .pipe(reworkWithPlugins)
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('add-fonts', function addFonts() {
  return gulp.src('node_modules/font-awesome/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('compile-static', function compileStatic() {
  return gulp.src('app/static/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('push-gh-pages', function pushGithubPages() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});

gulp.task('build', function build(cb) {
  sequence.apply(null, [
    'clean',
    'compile-stylesheets',
    'add-fonts',
    'compile-static',
  ].concat(cb));
});

gulp.task('deploy', function deploy(cb) {
  sequence.apply(null, [
    'build',
    'push-gh-pages'
  ].concat(cb));
});
