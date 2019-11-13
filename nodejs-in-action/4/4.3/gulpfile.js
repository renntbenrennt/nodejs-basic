const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

gulp.task('default', () => {
    return gulp.src('app/*.jsx')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/preset-env', "@babel/preset-react"]
        
        /// The following preset thing is for babel core 6
        /// and what was said the book Nodejs in action 2
        /// are for core 6!!!!
        /// DAMN!!!!
        // presets: ["@babel/preset-env"]

    }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    watch('app/**.jsx', () => gulp.start('default'));
});
