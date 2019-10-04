// Подключаем Gulp
const gulp = require("gulp"),


    debug = require('gulp-debug'),
    plumber = require('gulp-plumber'), // Обработка ошибок
    notify = require('gulp-notify'), // Уведомления
    webp = require('gulp-webp'), // Конвертация изображений в webP
    clean = require('gulp-clean'), // Удаление файлов
    ignore = require('gulp-ignore'),
    rename = require('gulp-rename'),




// Конвертируем изображения в webP
runImgtowebp = (done) => {

    var onError = function(err) {
        notify.onError({
            title: "Error in " + err.plugin,
            message: err.toString(),
        })(err);

        this.emit('end');
    };

    let imgSource = [
        __dirname + '/src/**/*.+(jpg|jpeg|png|PNG|JPG)',
    ]

    let excludeSource = [
        __dirname + '/src/test-2/**/*',
    ]


    // Options - https://github.com/imagemin/imagemin-webp#imageminwebpoptions

    return gulp.src(imgSource, { ignore: excludeSource })
        .pipe(debug({title: 'building img:', showFiles: true}))
        .pipe(plumber({errorHandler: onError}))
        .pipe(webp())
        .pipe(plumber.stop())
        .pipe(gulp.dest(__dirname + '/dist/'));
}


gulp.task('imgtowebp', runImgtowebp)