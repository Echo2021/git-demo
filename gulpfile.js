/**
 * gulp任务
 * @authors Your Name (you@example.org)
 * @date    2017-05-10 11:01:27
 * @version $Id$
 */
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
// less编译合并
gulp.task('style',function(){
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({
			stream:true
		}));
});

//js 合并压缩混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.reload(
		 {stream:true}));
});

// 图片复制
var imagemin = require('gulp-imagemin');
gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({
			stream:true
		}));
});

// html 合并,住htmlmin里有参数
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeComments:true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream:true
		}));

});

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve',function(){
	browserSync({
		server:{
			baseDir:['dist']
		},function(err,bs){
			console.log(bs.options.getIn("urls","local"));
		}
	});

	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['images']);
	gulp.watch('src/*.html',['html']);


});