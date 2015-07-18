Gulp Error Logger
=================

Takes an error object and tries to find the best thing to log from it. Optionally, depending on settings at creation, can pop up a system notification via [growl](http://npmjs.com/growl)

Usage
-----

```javascript
var errorFactory = require('gulp-error-logger')
var errorHandler = errorFactory()

// etc

foo.on('error', errorHandler)
bar.on('error', errorHandler)
```

API
---

#### `errorFactory(options)` ####

Returns a handler function that takes an error parameter, logging and notifying as necessary.

`options` is an optional object with optional properties:

* `notifications`: Boolean, default `true`, send notifications when logging or not.
* `notificationMessage`: Function that takes an error object and returns the message you want the notification to have.
* `notificationTitle`: Function that takes an error object and returns the title you want the notification to have.
* `notifier`: Function that takes an object with a title and a message, causes a notification to appear on the system. Defaults to [node-notifier](https://npmjs.com/node-notifier).
* `logger`: Function that takes a string and logs it in some way. Defaults to `gutil.log`.