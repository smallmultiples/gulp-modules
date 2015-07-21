module.exports = uploadFile

var gulp = require('gulp')
var awsPublish = require('gulp-awspublish')
var awsPublishRouter = require('gulp-awspublish-router')
var run = require('../cb-stream')
var ensureCache = require('./ensure-cache')

/**
 * Uploads a single file to AWS.
 *
 * * `options`: An object with the following properties:
 *     - `src`: The source file's path
 *     - `dest`: The destination path on the bucket
 *     - `aws`: The AWS settings, `key`, `secret`, `bucket`, `region`
 *     - `cache`: Integer value of seconds to cache for (defaults to 1 year)
 *                or the entire cache object
 *     - `gzip`: Optionally true to gzip before uploading
 * * `cb`: A callback to run after the upload is completed
 *
 * Returns the gulp stream
 */
function uploadFile (options, cb) {
    cb = cb || function () {}
    var src = options.src
    var dest = options.dest
    var aws = options.aws
    var cache = ensureCache(options.cache)
    var gzip = options.gzip || false

    if (!cache && cache !==0) cache = 1000 * 60 * 60 * 24 * 365 // 1 year
    if (gzip != true) gzip = false

    var publisher = awsPublish.create(aws)

    return gulp.src(src)
        .pipe(awsPublishRouter({
            cache: cache
          , routes: {
                '^.+$': {
                    gzip: gzip
                  , key: dest
                }
            }
        }))
        .pipe(publisher.publish())
        .pipe(awsPublish.reporter())
        .on('end', cb)
}