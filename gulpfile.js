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

const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const hbsFiles = [
    './assets/templates/**/*.hbs'
];
function hbs() {
    return src(hbsFiles)
    // Compile each Handlebars template source file to a template function
        .pipe(handlebars())
        // Wrap each template function in a call to Handlebars.template
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        // Declare template functions as properties and sub-properties of MyApp.templates
        .pipe(declare({
            namespace: 'Snake',
            noRedeclare: true, // Avoid duplicate declarations
            processName: function(filePath) {
                // Allow nesting based on path using gulp-declare's processNameByPath()
                // You can remove this option completely if you aren't using nested folders
                // Drop the client/templates/ folder from the namespace path by removing it from the filePath
                return declare.processNameByPath(filePath.replace('client/templates/', ''));
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./dist'));
}


let libraryFiles = './assets/js/libraries/*.js';
function libraries(){
    return src(libraryFiles)
        .pipe(concat('libraries.js'))
        .pipe(gulp.dest('./dist'));
}

let fontFiles = './assets/fonts/*.{TTF,ttf,woff,eof,svg}';
function copyFonts(){
    return src(fontFiles)
        .pipe(gulp.dest('./dist/fonts'));
}

function watch() {
    gulp.watch(htmlFiles, html);
    gulp.watch(scssFiles, scss);
    gulp.watch(jsFiles, js);
    gulp.watch(hbsFiles, hbs);
    gulp.watch(libraryFiles, libraries);
    gulp.watch(fontFiles, copyFonts);
}

exports.watch = watch;
exports.build = parallel(html, scss, js, hbs, libraries, copyFonts);