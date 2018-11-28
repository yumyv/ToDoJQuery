let gulp = require("gulp");
let cleanCSS = require("gulp-clean-css");
let rename = require("gulp-rename");
let babel = require("gulp-babel");
let uglyfly = require('gulp-uglyfly');
let browserSync = require("browser-sync");

let paths = {
    html: "./src/*.html",
    css: "./src/styles/*.css",
    js: "./src/scripts/*.js",
    img: "./src/images/*",
    fonts: "./src/fonts/*"
};

gulp.task("sync", () => {
    browserSync.init({
        server: {baseDir: "./dist"},
        port: 8080,
        open: true,
        notify: false
    })
});

gulp.task("html", () => {
    gulp.src(paths.html)
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("css", () => {
    gulp.src(paths.css)
        .pipe(cleanCSS({
            compatibility: 'ie8',
            format: 'beautify'
        }))
        .pipe(gulp.dest("./dist/styles"))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("./dist/styles"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("js", () => {
    gulp.src(paths.js)
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(gulp.dest("./dist/scripts"))
        .pipe(uglyfly())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("./dist/scripts"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("img", () => {
    gulp.src(paths.img)
        .pipe(gulp.dest("./dist/images"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("fonts", () => {
    gulp.src(paths.fonts)
        .pipe(gulp.dest("./dist/fonts"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("watch", () => {
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.img, ['img']);
    gulp.watch(paths.fonts, ['fonts']);
});

gulp.task("build", ["sync", "html", "css", "js", "img", "fonts", "watch"]);