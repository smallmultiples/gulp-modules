module.exports = styleFactory

var gutil = require('gulp-util')
var merge = require('lodash.merge')
var gulp = require('gulp')
var plumber = require('gulp-plumber')
var sourcemaps = require('gulp-sourcemaps')
var stylus = require('gulp-stylus')
var prefix = require('gulp-autoprefixer')
var minifyCss = require('gulp-minify-css')
var duration = require('gulp-duration')

var DEFAULTS = {
    start: gutil.colors.green('Compiling Stylus...')
  , time: 'Compiled Stylus'
  , error: function () {}
  , prefixOptions: {
      browsers: [ 'last 2 versions', 'ie >= 9' ]
    }
  , minifyOptions: {}
  , define: {}
}

function styleFactory (options) {
    options = merge({}, DEFAULTS, options)
    style.options = options

    return style

    function style (src, dest, params, cb) {
        params = params || {}
        cb = cb || function () {}
        gutil.log(options.start)

        var minify = params.minify
        var stream = gulp.src(src)
            .pipe(plumber(options.error))
            .pipe(sourcemaps.init())
            .pipe(stylus({
                define: options.define
              , sourcemap: true
              , 'include css': true
            }))
            .pipe(duration(options.time))
            .pipe(prefix(options.prefixOptions))

        if (minify) stream = stream.pipe(minifyCss(options.minifyOptions))

        return stream.pipe(sourcemaps.write())
            .pipe(gulp.dest(dest))
            .on('end', cb)
    }
}