const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const { src, dest, watch, series } = require('gulp'); // Utilisez 'watch' seulement une fois
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

// Tâche styles
gulp.task('styles', function () {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/styles'));
});

// Tâche watch pour les styles
gulp.task('watch-styles', function () {
  watch('src/styles/**/*.scss', gulp.series('styles'));
});

// Tâche JS
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

// Tâche watch pour les fichiers JS
function watchJs() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  watch('src/**/*.js', js);
  watch('*.html').on('change', browserSync.reload);
}

// Tâche pour les templates Nunjucks
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

// Tâche pour copier les mixins
gulp.task('copyMixins', function () {
  return gulp.src('src/mixins.scss').pipe(gulp.dest('dist'));
});

// Tâche pour copier le core SCSS
gulp.task('copyCoreSCSS', function () {
  return gulp.src('src/core.scss').pipe(gulp.dest('dist'));
});

// Tâche pour copier les fonts
gulp.task('copy-fonts', () => {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

// Tâche pour copier les images
gulp.task('copy-images', () => {
  return gulp.src('src/images/**/*').pipe(gulp.dest('dist/images'));
});

// Tâche serve pour la synchronisation
gulp.task('serve', () => {
  browserSync.init({
    server: 'dist',
  });

  gulp.watch('src/templates/**/*.njk', gulp.series('html'));
  gulp.watch('src/styles/**/*.scss', gulp.series('styles'));
});

// Tâche par défaut
gulp.task(
  'default',
  gulp.series('styles', 'watch-styles', 'serve', 'html', 'copy-fonts', 'copy-images', 'copyMixins', 'copyCoreSCSS')
);
