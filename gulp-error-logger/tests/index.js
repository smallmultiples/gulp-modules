var test = require('tape')
var errorLogger = require('../index')

test('Logs error or stack if available', function (t) {
    t.plan(2)
    var stringLogger = function (msg) {
        t.equals(msg, 'foo', 'No stack logging works')
    }
    var stackLogger = function (msg) {
        t.equals(msg, 'foo', 'Logging an object with a stack property logs the stack')
    }

    errorLogger({
        notifications: false
      , notifier: noop
      , logger: stringLogger
    })('foo')

    errorLogger({
        notifications: false
      , notifier: noop
      , logger: stackLogger
    })({ stack: 'foo' })
})

test('Respects notification preference', function (t) {
    t.plan(1)

    errorLogger({
        notifications: false
      , notifier: function () {
            t.fail('Notifier called when notifications turned off')
        }
      , logger: noop
    })('foo')

    t.pass('Notifier wasn\'t called when notifications turned off')
})

test('Calls notification message and title generators', function (t) {
    t.plan(2)

    errorLogger({
        notifications: true
      , notifier: noop
      , logger: noop
      , notificationMessage: function (err) {
            t.equals(err, 'foo', 'Custom notification message function called')
        }
      , notificationTitle: function (err) {
            t.equals(err, 'foo', 'Custom notification title function called')
        }
    })('foo')
})


function noop () {}