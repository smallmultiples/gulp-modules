module.exports = templateFactory

var gutil = require('gulp-util')
var merge = require('lodash.merge')
var gulp = require('gulp')
var plumber = require('gulp-plumber')
var jade = require('gulp-jade')
var duration = require('gulp-duration')

var DEFAULTS = {
    start: gutil.colors.green('Compiling Jade...')
  , time: 'Compiled Jade'
  , error: function () {}
}

function templateFactory (options) {
    options = merge({}, DEFAULTS, options)

    return template

    function template(src, dest, params, cb) {
        params = params || {}
        cb = cb || function () {}
        gutil.log(options.start)

        var locals = params.locals
        return gulp.src(src)
            .pipe(plumber(options.error))
            .pipe(jade({
                pretty: false
              , locals: locals
            }))
            .pipe(duration(options.time))
            .pipe(gulp.dest(dest))
            .on('end', cb)
    }
}