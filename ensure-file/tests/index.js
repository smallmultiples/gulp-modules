var test = require('tape')
var ensureFile = require('../index')
var ensureFileJson = require('../json')
var fs = require('fs')
var path = require('path')

var BASE = path.resolve(__dirname, 'tmp')

if (fs.existsSync(BASE)) {
    fs.unlinkSync(path.join(BASE, 'json-sync'))
    fs.unlinkSync(path.join(BASE, 'text-async'))
    fs.unlinkSync(path.join(BASE, 'text-sync'))
}
else {
    fs.mkdirSync(BASE)
}

test('Ensures files', function (t) {
    t.plan(4)
    ensureFile(path.join(BASE, 'text-async'), 'foo', function (err, contents) {
        t.equals(contents, 'foo', 'Returns default contents asynchronously')
        contents = fs.readFileSync(path.join(BASE, 'text-async')).toString()
        t.equals(contents, 'foo', 'Creates file with contents asynchronously')
    })

    var contents = ensureFile.sync(path.join(BASE, 'text-sync'), 'foo')
    t.equals(contents, 'foo', 'Returns default contents synchronously')
    contents = fs.readFileSync(path.join(BASE, 'text-sync')).toString()
    t.equals(contents, 'foo', 'Creates file with contents synchronously')
})

test('Ensures json files', function (t) {
    t.plan(4)
    ensureFileJson(path.join(BASE, 'json-async'), {foo: 'bar'}, function (err, contents) {
        t.deepEquals(contents, {foo: 'bar'}, 'Returns default contents asynchronously')
        contents = JSON.parse(fs.readFileSync(path.join(BASE, 'json-async')).toString())
        t.deepEquals(contents, {foo: 'bar'}, 'Creates file with contents asynchronously')
    })

    var contents = ensureFileJson.sync(path.join(BASE, 'json-sync'), {foo: 'bar'})
    t.deepEquals(contents, {foo: 'bar'}, 'Returns default contents synchronously')
    contents = JSON.parse(fs.readFileSync(path.join(BASE, 'json-sync')).toString())
    t.deepEquals(contents, {foo: 'bar'}, 'Creates file with contents synchronously')
})