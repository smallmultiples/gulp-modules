var test = require('tape')
var ncalls = require('../index')

test('Only runs on the nth calls', function (t) {
    t.plan(3)

    var counter = 0
    var callback = function () { counter++ }

    var done = ncalls(2, callback)

    done()
    t.equals(counter, 0, 'Does not call callback when it is not the nth call')

    done()
    t.equals(counter, 1, 'Calls calback on the nth call')

    done()
    t.equals(counter, 1, 'Does not call callback after the nth call')

    t.end()
})