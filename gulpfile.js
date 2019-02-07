

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    cssmin = require('gulp-minify-css');

gulp.task('ts_jade', function() {
    gulp.src('src/html/*.jade')
        .pipe(jade({pretty: false}).on('error', function(err){
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest('sands/html'))
});
gulp.task('ts_stylus', function() {
    gulp.src('src/css/app.styl')
        .pipe(stylus())
        .pipe(cssmin())
        .pipe(gulp.dest('sands/css'))
});

gulp.task('ts_js', function() {
    gulp.src('src/script/*.js')
        .pipe(uglify().on('error', function(err){
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest('sands/script'))
});

gulp.task('ts_img', function() {
    gulp.src('src/image/**/*')
        .pipe(gulp.dest('sands/image'))
});

gulp.task('ts_font', function() {
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('sands/fonts'))
});


gulp.task('default', function() {
    gulp.start('ts_jade','ts_stylus', 'ts_font', 'ts_img','ts_js','watch');
});

gulp.task('watch', function() {
    gulp.watch('src/**/**/*.jade', ['ts_jade']);
    gulp.watch('src/**/css/*', ['ts_stylus']);
    gulp.watch('src/**/script/*', ['ts_js']);
    gulp.watch('src/**/image/*', ['ts_img']);
});
