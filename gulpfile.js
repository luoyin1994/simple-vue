const gulp  = require('gulp');
const babel = require('gulp-babel');
const src   = './src/**/*.js';

gulp.task('default', () => {
    gulp.src(src)
        .pipe(babel({presets: ['env']}))
        .pipe(gulp.dest('./dist'));
});
gulp.watch(src, ['default']);
