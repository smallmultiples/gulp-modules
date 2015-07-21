NCalls
======

Utility functions for starting a livereload server, and then triggering reloads.

Usage
-----

```javascript
var livereload = require('@smallmultiples/livereload')
var triggerFactory = require('@smallmultiples/livereload/trigger')

var lrPort = 35729

var triggerLr = triggerFactory({ port: lrPort })
var reloadAll = triggerLr.bind(null, 'all') // Convenience
var reloadCss = triggerLr.bind(null, 'css') // Convenience

livereload(lrPort, function (err) {
    if (err) return console.error(err)
    reloadAll() // Triggers a full refresh
    reloadCss() // Triggers a refresh of only the css
})
```

API
---

#### `livereload(port, callback)` ####

Starts a livereload server on `port`, calling `callback(err)` when finished or there's an error.

#### `triggerFactory(options)` ####

Returns a function for triggering livereload page refreshes. Options can be:

* `'protocol'`: Protocol of the livereload server. Defaults to `'http'`.
* `'host'`: Host of the livereload server. Defaults to `'127.0.0.1'`.
* `'port'`: Port of the livereload server. Defaults to `35729`.

#### `trigger(type)` ####

Triggers a livereload. `type` can be `'all'` or `'css'`, which will tell the server to refresh the whole page or just the css. For `'css'` to work your css file needs to be called `index.css`.