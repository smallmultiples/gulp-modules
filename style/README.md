NCalls
======

Takes a number, and a callback, and returns a function. The callback will only be called on the nth call (the number provided).

Usage
-----

```javascript
var ncalls = require('ncalls')
var callback = function () { 
    console.log('foo') 
}

var wrapped = ncalls(3, callback)

wrapped()
wrapped()
wrapped() // 'foo' logged to console
wrapped()
```

API
---

#### `ncalls(count, callback)` ####

Takes a `count` and a `callback` and returns a function that will only call `callback` the `count` time it is called.

* `count`: The number of times the returned function has to be called before `callback` will be called.
* `callback`: The function you want to call on the `count` wrapping function's call.