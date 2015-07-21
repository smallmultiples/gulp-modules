module.exports = triggerFactory

var merge = require('lodash.merge')
var http = require('http')

var DEFAULTS = {
    protocol: 'http'
  , host: '127.0.0.1'
  , port: 35729
}

function triggerFactory(options) {
    options = merge({}, DEFAULTS, options)

    return triggerLivereload

    function triggerLivereload (type) {
        var query = ''
        if (type === 'all') query = 'files=index.html'
        if (type === 'css') query = 'files=index.css'
        var url = options.protocol + '://' + options.host + ':' + options.port
        http.get(url + '/changed?' + query)
    }
}