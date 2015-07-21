module.exports = serveFactory

var gutil = require('gulp-util')
var merge = require('lodash.merge')
var connect = require('connect')
var pushState = require('connect-pushstate')
var injectLr = require('connect-livereload')
var serveStatic = require('serve-static')
var cors = require('cors')
var http = require('http')

var DEFAULTS = {
    onSuccess: function (port) {
        return gutil.colors.blue('Server port: ') + port
    }
  , onError: function () {}
}

function serveFactory (options) {
    options = merge({}, DEFAULTS, options)

    return serve

    function serve (src, params, cb) {
        params = params || {}
        var port = params.port
        var lrPort = params.lrPort

        var app = connect()
            .use(pushState())
            .use(injectLr({ port: lrPort }))
            .use(serveStatic(src))
            .use(cors())

        staticServer = http.createServer(app)
        return staticServer.listen(port, function (err) {
            if (err) return options.onError(err)
            gutil.log(options.onSuccess(port))
            if (cb) cb()
        })
    }
}
