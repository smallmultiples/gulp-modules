var test = require('tape')
var builder = require('../index')

test('Joins strings in all various ways', function (t) {
    t.plan(3)

    t.equal(builder('a')('b'), 'ab', 'string + string')
    t.equal(builder('')('a'), 'a', 'empty string + string')
    t.equal(builder('a')(''), 'a', 'string + empty string')

    t.end()
})

test('Joins objects', function (t) {
    t.plan(1)

    t.equal(builder('a')({ toString: function () { return 'b'} }), 'ab', 'string + object')

    t.end()
})

test('Joins arrays', function (t) {
    t.plan(3)

    t.equal(builder('a')(['b', 'c']), 'abc', 'string + array')
    t.equal(builder('a')([]), 'a', 'string + empty array')
    t.equal(builder('a', 'c')(['b', 'd']), 'abcd', 'string + array (with joiner)')

    t.end()
})

test('Joins multiple arguments', function (t) {
    t.plan(1)

    t.equal(builder('a')('b', 'c'), 'abc', 'string + string + string')

    t.end()
})