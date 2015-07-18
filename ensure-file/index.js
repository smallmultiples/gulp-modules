exports = module.exports = ensureFile
exports.sync = ensureFileSync

var fs = require('fs')

function ensureFile (path, contents, callback) {
    fs.exists(path, function (exists) {
        if (!exists) {
            return fs.writeFile(path, contents, function (err) {
                callback(err, contents)
            })
        }

        fs.readFile(path, callback)
    })
}

function ensureFileSync (path, contents) {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, contents)
        return contents
    }

    return fs.readFileSync(path)
}