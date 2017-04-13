var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect',function(){
    connect.server({
        port : 3000,
        root : './',
        livereload : true
    });
});

gulp.task('default',['connect']);
