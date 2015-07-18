module.exports = buildHandler

var gutil = require('gulp-util')
var notifier = require('node-notifier')
var defaults = require('defaults')

var defaultOptions = {
    notifications: true
  , notificationMessage: defaultMessage
  , notificationTitle: defaultTitle
  , notifier: notifier.notify.bind(notifier)
  , logger: gutil.log
}

function buildHandler (options) {
    options = defaults(options, defaultOptions)
    return handler

    // Log the error and if the user has specified they want notifications for
    // errors, show it as a notification.
    function handler (err, cb) {
        options.logger((err && err.stack) || err)
        if (options.notifications) {
            options.notifier({
                title: options.notificationTitle(err)
              , message: options.notificationMessage(err)
            })
        }
    }
}

function defaultMessage (err) {
    return 'Check terminal.'
}

function defaultTitle (err) {
    return 'ERROR'
}