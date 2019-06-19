const gulp = require('gulp');
const { src, parallel } = require('gulp');

let htmlFiles = './assets/*.html';
function html(){
    return src(htmlFiles).pipe(gulp.dest('./dist'));
}

const order = require('gulp-order');
// const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');

let jsFiles = './assets/js/*.js';
function js(){
    return src(jsFiles)
        .pipe(order(jsFiles, { base: './' }))
        .pipe(concat('app.js'))
        // .pipe(babel({
        //     presets: ["@babel/preset-env"]
        // }))
        // .pipe(uglify(js_files))
        .pipe(gulp.dest('./dist'));
}

const clean_css = require('gulp-clean-css');
const auto_prefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

let scssFiles = './assets/scss/*.scss';
function scss(){
    return gulp.src(scssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(clean_css({compatibility: 'ie9'}))
        .pipe(auto_prefixer('last 2 version', 'safari 5', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./dist'));
}

function watch() {
    gulp.watch(htmlFiles, html);
    gulp.watch(scssFiles, scss);
    gulp.watch(jsFiles, js);
}

exports.watch = watch;
exports.build = parallel(html, scss, js);