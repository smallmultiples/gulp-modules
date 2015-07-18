Ensure File
===========

Given some contents, ensure a file with those contents exists. Callback or return with the file's contents.

Usage
-----

```javascript

var ensureFile = require('ensure-file')

ensureFile('path/to/file.md', '# foo', function (err, contents) {
    console.log(contents) // '# foo', or contents of existing file
})
// Synchronous version
var contents = ensureFile.sync('path/to/file.md', '# foo')


var ensureJsonFile = require('ensure-file/json')

ensureFileJson('path/to/file.json', { foo: 'bar' }, function (err, contents) {
    console.log(contents) // { foo: 'bar' } or contents of existing file
})
// Synchronous version
var contents = ensureJsonFile.sync('path/to/file.md', { foo: 'bar' })
```

API
---

### `ensureFile(path, contents, callback)` ###

Looks for a file at `path`. If the file exists, calls `callback` with any error that occurred and the contents of the file. If a file doesn't exist at `path`, it will first create the file with the default `contents` before calling the callback with any error and the default contents.

### `ensureFile.sync(path, contents)` ###

The same as `ensureFile()` but synchronous. 

### `ensureJsonFile(path, contents, callback)` ###

The same as `ensureFile()`, however the contents will be run through JSON.stringify before being written to file, and JSON.parse before being returned.

### `ensureJsonFile.sync(path, contents, callback)` ###

The same as `ensureJsonFile()` but synchronous