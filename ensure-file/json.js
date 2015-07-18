exports = module.exports = ensureJsonFile
exports.sync = ensureJsonFileSync

var ensureFile = require('./index')

function ensureJsonFile (path, contents, callback) {
    if (typeof contents !== 'string') {
        contents = JSON.stringify(contents, null, '    ')
    }

    ensureFile(path, contents, function (err, contents) {
        if (err) return callback(err)
        callback(null, JSON.parse(contents))
    })
}

function ensureJsonFileSync (path, contents) {
    if (typeof contents !== 'string') {
        contents = JSON.stringify(contents, null, '    ')
    }

    return JSON.parse(ensureFile.sync(path, contents))
}