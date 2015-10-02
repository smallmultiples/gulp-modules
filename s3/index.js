module.exports = deployFactory

var merge = require('lodash.merge')
var awsPublish = require('gulp-awspublish')
var gulp = require('gulp')
var revall = require('gulp-rev-all')
var awsPublishRouter = require('gulp-awspublish-router')
var parallelise = require('concurrent-transform')

var HTML_FILES = /.*\.html$/g
var DEFAULTS = {
    cache: {
        cacheTime: 1000 * 60 * 60 * 24 * 365
    }
  , routes: function (path) {
        return {
            // Text assets get gzipped
            '^.+\.(?:json|js|css|topojson|geojson|svg)$': {
                gzip: true
              , key: path + '$&'
            }
            // HTML gets shorter cache time
          , '^.+\.html$': {
                gzip: true
              , key: path + '$&'
              , cacheTime: 1000 * 60 * 5 // 5 minutes
            }
            // Passthrough for everything else
          , '^.+$': path + '$&'
        }
    }
  , aws: {
        key: ''
      , secret: ''
      , bucket: ''
      , region: ''
    }
  , concurrent: 20
}

function deployFactory (options) {
    options = merge({}, DEFAULTS, options)

    return deploy

    function deploy (src, dest, params, cb) {
        params = params || {}
        cb = cb || function () {}
        var base = params.base
        var versioning = params.versioning

        options.aws.Bucket = options.aws.bucket
        var awsPublishOptions = {
            params: {
                Bucket: options.aws.bucket
            }
          , accessKeyId: options.aws.key
          , secretAccessKey: options.aws.secret
          , region: options.aws.region
        }

        var publisher = awsPublish.create(awsPublishOptions)
        var stream = gulp.src(src, { base: base })

        // if (versioning) stream = stream.pipe(revall({ ignore: [ HTML_FILES ] }))
        return stream
            .pipe(awsPublishRouter({
                cache: options.cache
              , routes: options.routes(dest)
            }))
            .pipe(parallelise(publisher.publish(), options.concurrent))
            .pipe(awsPublish.reporter())
            .on('end', cb)
    }
}