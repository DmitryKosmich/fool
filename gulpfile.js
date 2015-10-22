var p = require('./package.json'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    htmlreplace = require('gulp-html-replace');

var jsFiles = [
       'src/js/FOOL.js',
       'src/js/services/utils/Document.js',
       'src/js/services/utils/Randomizer.js',
       'src/js/services/utils/SearchEngine.js',
       'src/js/model/Card.js',
       'src/js/model/Player.js',
       'src/js/model/Game.js',
       'src/js/view/UICardCarrier.js',
       'src/js/view/UIDetector.js',
       'src/js/view/UIBuilder.js',
       'src/js/services/events/GameEvent.js',
       'src/js/services/events/EventFactory.js',
       'src/js/services/events/EventListener.js',
       'src/js/services/events/EventTunnel.js',
       'src/js/services/core/GameEngine.js',
       'src/js/services/core/AI.js',
       'src/js/view/UIController.js',
       'src/js/view/UIHelper.js',
       'src/js/view/modals/UIModal.js'
];

var cssFiles = [
    'src/css/animation/remove-card-up.css',
    'src/css/animation/remove-card-down.css',
    'src/css/animation/add-card-up.css',
    'src/css/animation/add-card-down.css',
    'src/css/card-sprite.css',
    'src/css/modal.css',
    'src/css/styles.css'
];

var imgFiles = 'src/img/card-sprite.png';

var htmlFiles = 'src/index.html';

gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(uglify())
        .pipe(concat(p.name + '.min.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('css', function () {
    return gulp.src(cssFiles)
        .pipe(minify())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat(p.name + '.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('img', function() {
    return gulp.src(imgFiles)
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
});

gulp.task('html', function() {
    return gulp.src(htmlFiles)
        .pipe(htmlreplace({
            'css': 'css/' + p.name + '.min.css',
            'js': 'js/' + p.name + '.min.js'
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
    gulp.watch(jsFiles, ['js']);
    gulp.watch(cssFiles, ['css']);
    gulp.watch(imgFiles, ['img']);
    gulp.watch(htmlFiles, ['html']);
});

gulp.task('default', ['js', 'css', 'img', 'html', 'watch']);