Bundle
======

Factory for a bundle function that can be called in multiple places without setting it up often. Uses browserify but with configuration will swap to using watchify instead.

[csonify]: http://npmjs.com/csonify
[babelify]: http://npmjs.com/babelify

Usage
-----

```javascript
var bundleFactory = require('lib/gulp/bundle')
var bundle = bundleFactory({ error: console.error, filename: 'bundled.js' })
bundle('path/to/entry.js', 'path/to/bundled/folder', { debug: true }, done)
```

Missing a lot of the potential options, see api for all of them.

API
---

#### `makeBundle(options)` ####

Returns the `bundle()` function which you will subsequently call. Takes the following options:

* `start`: The string to log when starting a bundle. Defaults to: `'Bundinling Javascript...'`.
* `time`: The string to log when showing how much time a bundle took to complete. Defaults to: `'Bundled JavaScript'`
* `error`: Callback for the error event from the bundler. Defaults to a no-op.
* `transforms`: Array of transforms to pass into a browserify bundler's transform function. Defaults to `[ 'csonify', 'babelify' ]`.
* `extensions`: Passed into the browserify bundler options. Defaults to `[ '.cson', '.json' ]`
* `excludes`: Array of excludes to pass into a browserify bundler's exclude function.
* `onUpdate`: If using watchify, called when the bundler triggers an update and the re-bundle is finished.
* `filename`: What the bundled file should be called. Defaults to `'app.js'`
* `buildNotifications`: Do you want build notifications or not. Defaults to false.
* `notificationText`: Message in build notifications. Defaults to `'Build is ready'`
* `notificationTitle`: Title of build notifications. Defaults to `'BUILD'`
* `uglify`: Options to pass to uglify.

#### `bundle(entry, dest, params, callback)` ####

Bundles the javascript together. Takes an entry file, a destination folder, a params object and a callback to call when the bundle finishes.

* `entry`: The entry file for browserify.
* `dest`: The folder you want to put the bundled file into.
* `params`: An object containing the various params for the bundle.
    * `params.debug`: Passed to the browserify bundler. Determines sourcemaps or not. Default `false`
    * `params.minify`: Determines if we minify or not. Default `false`.
    * `params.once`: Determines if we use browserify (`true`) or watchify (`false`) and rebundle on changes. Default `false`.
* `callback`: A callback to call when the bundle finishes. When using watchify, only called after the first bundle.

