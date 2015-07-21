module.exports = staticFactory

var merge = require('lodash.merge')
var gulp = require('gulp')
var gutil = require('gulp-util')
var plumber = require('gulp-plumber')
var duration = require('gulp-duration')

var DEFAULTS = {
    start: gutil.colors.green('Copying static files...')
  , time: 'Copied static files'
  , error: function () {}
}

function staticFactory (options) {
    options = merge({}, DEFAULTS, options)

    return copyStatic

    function copyStatic (src, dest, params, cb) {
        params = params || {}
        cb = cb || function () {}
        gutil.log(options.start)

        var base = params.base

        return gulp.src(src, { base: base })
            .pipe(plumber(options.error))
            .pipe(gulp.dest(dest))
            .pipe(duration(options.time))
            .on('end', cb)
    }
}