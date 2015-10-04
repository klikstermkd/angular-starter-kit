/* global require */

(function() {

   'use strict';

   var gulp = require('gulp');
   var connect = require('connect');
   var browserSync = require('browser-sync');
   var del = require('del');
   var runSequence = require('run-sequence');
   var historyApiFallback = require('connect-history-api-fallback');
   var reload = browserSync.reload;
   var $ = require('gulp-load-plugins')();

   var settings = {
      serverPort: 8000,
      src: {
         app: 'app',
         scripts: 'app/scripts',
         styles: 'app/styles',
         views: 'app/views'
      },
      dist: {
         app: 'dist',
         scripts: 'dist/scripts',
         styles: 'dist/styles',
         views: 'dist/views'
      }
   };

   // Lint javascript
   gulp.task('jshint', function() {
      return gulp.src(settings.src.scripts + '/**.*js')
         .pipe($.jshint())
         .pipe($.jshint.reporter('jshint-stylish'));
   });

   // Concatenate vendor CSS files
   gulp.task('styles:vendor', function () {
      return gulp.src(settings.src.app + '/bower_components/bootstrap/dist/css/bootstrap.min.css')
         .pipe($.concat('vendor.css'))
         .pipe(gulp.dest(settings.dist.styles));
   });

   // Prefix, concatenate and minify app CSS files
   gulp.task('styles:app', function () {
      return gulp.src(settings.src.styles + '/*.css')
         .pipe($.autoprefixer('last 3 versions'))
         .pipe(gulp.dest(settings.src.styles))
         .pipe($.concat('app.css'))
         .pipe($.csso())
         .pipe(gulp.dest(settings.dist.styles));
   });

   // Concatenate bower components
   gulp.task('scripts:bower', function() {
      var files = [settings.src.app + '/bower_components/angular/angular.min.js',
                   settings.src.app + '/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                   settings.src.app + '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'];

      gulp.src(files)
         .pipe($.concat('vendor.js'))
         .pipe(gulp.dest(settings.dist.scripts));
   });

   // Concatenate, annotate and minify app scripts
   gulp.task('scripts:app', function() {
      gulp.src(settings.src.scripts + '/**/*.js')
         .pipe($.concat('app.js'))
         .pipe($.ngAnnotate())
         .pipe($.uglify())
         .pipe(gulp.dest(settings.dist.scripts));
   });

   // Minify html views
   gulp.task('html:views', function() {
      return gulp.src(settings.src.views + '/*.html')
         .pipe($.minifyHtml({quotes: true, empty: true}))
         .pipe(gulp.dest(settings.dist.views));
   });

   // Update CSS and JS references in index.html and minify index.html
   gulp.task('html:index', function() {
      return gulp.src(settings.src.app + '/index.html')
         .pipe($.useref())
         .pipe($.minifyHtml({quotes: true, empty: true}))
         .pipe(gulp.dest(settings.dist.app));
   });

   // Clean output directory
   gulp.task('clean', del.bind(null, settings.dist.app));

   // Watch files for changes & reload
   gulp.task('bs', function() {
      browserSync.init(settings.src.styles + '/*.css', {
         proxy: 'localhost:' + settings.serverPort,
         notify: false
      });

      gulp.watch(settings.src.app + '/index.html', reload);
      gulp.watch(settings.src.views + '/*.html', reload);
      gulp.watch(settings.src.scripts + '/**/*.js', reload);
   });

   // Start the server
   gulp.task('serve', function() {
      var app = connect();

      //app.use(historyApiFallback);
      app.use(connect.static(settings.src.app));

      app.listen(settings.serverPort);
   });

   // Build the app
   gulp.task('build', ['clean'], function() {
      runSequence('styles:vendor', 'styles:app', 'scripts:bower', 'scripts:app', 'html:views', 'html:index');
   });

   gulp.task('default', ['clean'], function(cb) {
      runSequence('serve', 'bs', 'jshint', cb);
   });

})();
