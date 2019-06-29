var config = {
    cssFiles: [
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/font-awesome/css/font-awesome.min.css',
        './node_modules/animate.css/animate.min.css',
        './css/main.css',
        './css/responsive.css'
    ],
    jsFiles: [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/page/page.js',
        './node_modules/waypoints/lib/jquery.waypoints.min.js',
        './js/jqBootstrapValidation.js',
        './js/contact.js',
        './js/scroll-animation.js',
        './js/main.js'
    ]
};

//List of necessary gulp plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var htmlminify = require("gulp-html-minify");

// Error function
function errorlog(err) {
    console.error(err.message);
    this.emit('end');
}

//HTML Task
gulp.task('html', function () {
    return gulp.src('./pages/**/*.html')
        .pipe(htmlminify())
        .pipe(gulp.dest('./dist/pages'))
        .on('error', errorlog);
});

//SASS Task
gulp.task('scss', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest('./css'))
        .on('error', errorlog);
});


//CSS Task
gulp.task('styles', function () {
    return gulp.src(config.cssFiles)
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./dist'))
        .on('error', errorlog);
});

//JS Task
gulp.task('scripts', function () {
    return gulp.src(config.jsFiles)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./dist'))
        .on('error', errorlog);
});

//Images Task
gulp.task('images', function () {
    return gulp.src('images/**/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 7
        }))
        .pipe(gulp.dest('./images'));
});

//Fonts Task
gulp.task('fonts', function () {
    return gulp.src([
            './node_modules/font-awesome/fonts/**/*',
            './node_modules/bootstrap/fonts/**/*'
        ])
        .pipe(gulp.dest('./dist/fonts'));
});

//Watch Task
gulp.task('watch', function () {
    gulp.watch('./js/**/*.js', ['scripts']);
    gulp.watch('./scss/**/*.scss', ['scss']);
    gulp.watch('./css/**/*.css', ['styles']);
    gulp.watch('./pages/**/*.html', ['html']);
});

//Default task
gulp.task('default', ['scss', 'styles', 'scripts', 'html']);