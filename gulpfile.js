var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('connect',function(){
    connect.server({
        port : 3000,
        root : './',
        livereload : true
    });
});

gulp.task('watch',function(){
    gulp.watch('/sass/*.scss',['sass']);
});

gulp.task('sass',function(){
    return gulp.src('/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('/css/'));
});

gulp.task('default',['connect','watch','sass']);
