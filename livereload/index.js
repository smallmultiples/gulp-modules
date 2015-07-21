module.exports = livereload

var gutil = require('gulp-util')
var lr = require('tiny-lr')

function livereload (port, cb) {
    return lr().listen(port, function(err) {
        if (err) return cb(err)
        gutil.log(options.success(port))
        if (cb) cb()
    })
}