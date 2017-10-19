const gulp = require('gulp');
const qml = require('./gulp-qmlweb');
const concat = require('gulp-concat');
const gls = require('gulp-live-server');
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
  "qmlweb/QmlWeb.js",
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
]

const all_sources = sources.concat(app_sources)

// This is required because other values confuse PhantomJS, and are sometimes
// set by default by the system.
process.env.QT_QPA_PLATFORM = "";

gulp.task('qrc', function() {
  return gulp.src(app_sources)
    .pipe(qml({ pathFilter: (path) => { return "/" + path } }))
    .pipe(concat('qrc.js'))
    .pipe(gulp.dest('./qmlweb/engine/'));
});

gulp.task("qmlweb", () =>
  gulp.src(sources)
  .pipe(order(sources, { base: __dirname }))
  .pipe(sourcemaps.init())
  .pipe(concat("qmlweb.js"))
  .pipe(changed("./lib"))
  .pipe(babel())
  .pipe(replace(/"use strict";/g, ""))
  .pipe(iife({
    useStrict: false,
    params: ["global"],
    args: ["typeof global != \"undefined\" ? global : window"]
  }))
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest("./lib"))
);

gulp.task("qmlweb.min", ["qmlweb"], () =>
  gulp.src("./build/js/qmlweb/qmlweb.js")
  .pipe(rename("qmlweb.min.js"))
  .pipe(changed("./build/js/qmlweb"))
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest("./build/js/qmlweb"))
);

gulp.task("build-dev", ["qmlweb"]);
gulp.task("build", ["qmlweb.min"]);

gulp.task('serve', function() {
  var server = gls.static('build', 3000); //folder and port
  server.start();

  //use gulp.watch to trigger server actions(notify, start or stop) 
  gulp.watch(all_sources, function(file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task("watch", ["build-dev", "serve"], () => {
  gulp.watch(all_sources, ["build-dev"]);
});