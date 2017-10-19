const gulp = require('gulp');
const qml = require('./gulp-qmlweb');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");
const changed = require("gulp-changed");
const order = require("gulp-order");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const iife = require("gulp-iife");
const babel = require("gulp-babel");
const replace = require("gulp-replace");
const karma = require("karma");
const path = require("path");

const sources = [
  "qmlweb/qtbase/QObject.js",
  "qmlweb/qtbase/*.js",
  "qmlweb/modules/QtQml/Qt.js",
  "qmlweb/engine/QML*.js",
  "qmlweb/engine/*.js",
  "qmlweb/modules/**/*.js",
];

const app_sources = [
  "src/**/*.qml",
  "src/**/*.js",
];

const qmlweb_output = './build/js/qmlweb/';
const app_output = './build/js/';

const all_sources = sources.concat(app_sources).concat(["qmlweb/QmlWeb.js"]);

// This is required because other values confuse PhantomJS, and are sometimes
// set by default by the system.
process.env.QT_QPA_PLATFORM = "";

gulp.task('app-parser', function() {
  return gulp.src(app_sources)
    .pipe(qml({
      pathFilter: (p) => {
        return p.substr(p.search('/'));
      }
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('qmlweb/'));
});

gulp.task('app', ["app-parser"], function() {
  return gulp.src(["qmlweb/QmlWeb.js", "qmlweb/app.js"])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(app_output));
});

gulp.task('app.min', ["app-parser"], function() {
  return gulp.src([app_output + "app.js"])
    .pipe(rename('app.min.js'))
    .pipe(changed(app_output))
    .pipe(uglify())
    .pipe(gulp.dest(app_output));
});

gulp.task("qmlweb", () =>
  gulp.src(sources)
  .pipe(order(sources, { base: __dirname }))
  .pipe(concat("qmlweb.js"))
  .pipe(changed(qmlweb_output))
  .pipe(babel())
  .pipe(replace(/"use strict";/g, ""))
  .pipe(iife({
    useStrict: false,
    params: ["global"],
    args: ["typeof global != \"undefined\" ? global : window"]
  }))
  .pipe(gulp.dest(qmlweb_output))
);

gulp.task("qmlweb.min", ["qmlweb"], () =>
  gulp.src(qmlweb_output + "qmlweb.js")
  .pipe(rename("qmlweb.min.js"))
  .pipe(changed(qmlweb_output))
  .pipe(uglify())
  .pipe(gulp.dest(qmlweb_output))
);

gulp.task("build-dev", ["qmlweb", "app"]);
gulp.task("build", ["qmlweb.min", "app.min"]);

gulp.task('serve', function() {
  browserSync.init({
    server: "./build"
  });
  gulp.watch(["./build/**/*"]).on('change', browserSync.reload);
});

gulp.task("watch", ["build-dev", "serve"], () => {
  gulp.watch(all_sources, ["build-dev"]);
});