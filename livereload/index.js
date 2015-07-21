module.exports = livereloadFactory

var gutil = require('gulp-util')
var merge = require('lodash.merge')
var lr = require('tiny-lr')

var DEFAULTS = {
    success: function (port) {
        return gutil.colors.blue('Livereload port: ') + port
    }
  , error: function () {}
}

function livereloadFactory (options) {
    options = merge({}, DEFAULTS, options)

    return livereload

    function livereload (port, cb) {
        return lr().listen(port, function(err) {
            if (err) return options.error(err)
            gutil.log(options.success(port))
            if (cb) cb()
        })
    }
}