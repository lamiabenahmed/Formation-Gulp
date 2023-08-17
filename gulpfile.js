const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const { src, dest, watch, series } = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

//js
function js() {
  return src('src/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(webpack({
      mode: 'development',
      devtool: 'inline-source-map'
    }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(terser({ output: { comments: false } }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  watch('src/**/*.js', js);
  watch('*.html').on('change', browserSync.reload);
}

exports.default = series(js, watchFiles);
// Process Nunjucks templates

gulp.task('html', () => {
  return gulp
    .src('src/templates/*.njk')
    .pipe(
      nunjucksRender({
        path: ['src/templates', 'src/templates/components'],
      })
    )
    .pipe(gulp.dest('dist'));
});
////mixins
gulp.task('copyMixins', function () {
  return gulp.src('src/mixins.scss').pipe(gulp.dest('dist'));
});
gulp.task('default', gulp.series('copyMixins'));
///core
gulp.task('copyCoreSCSS', function () {
  return gulp.src('src/core.scss').pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('copyCoreSCSS'));
// Copy fonts
gulp.task('copy-fonts', () => {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

// Copy images
gulp.task('copy-images', () => {
  return gulp.src('src/images/**/*').pipe(gulp.dest('dist/images'));
});

//Process SCSS styles
gulp.task('styles', () => {
  return gulp
    .src('*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('build-styles', function () {

  return gulp.src('./*.scss')

    .pipe(sass().on('error', sass.logError))

    .pipe(gulp.dest('./dist/styles'));

});

// Serve the page and watch for changes
gulp.task('serve', () => {
  browserSync.init({
    server: 'dist',
  });

  gulp.watch('src/templates/**/*.njk', gulp.series('html'));
  gulp.watch('src/styles/**/*.scss', gulp.series('build-styles'));
});

// Generate Nunjucks HTML files
gulp.task('nunjucks-html', function () {
  return gulp
    .src('./src/*.njk')
    .pipe(
      nunjucksRender({
        path: ['./src'],
        ext: '.html',
      })
    )
    .pipe(gulp.dest('./dist'));
});

// Default task: Run 'serve', 'html', 'styles', 'copy-fonts', 'copy-images' when Gulp is run without any task
gulp.task(
  'default',
  gulp.series('serve', 'html', 'styles', 'copy-fonts', 'copy-images')
);
