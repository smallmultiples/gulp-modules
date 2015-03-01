String Builder
==============

Convenience function for building strings from a common base

Usage
-----

Build a function that appends strings to the common base and returns it

```javascript
var fn = builder('foo')
fn('bar') // 'foobar'
```

It will join multiple arguments passed in:

```javascript
var fn = builder('foo')
fn('bar', 'baz') // 'foobarbaz'
```

If you pass in an array as an argument it will join the array with the joiner argument (passed into the factory as the second argument, defaults to '') before concating the base and the args together.

```javascript
var fn = builder('foo')
fn(['bar', 'baz']) // 'foobarbaz'

fn = builder('foo', ':')
fn(['bar', 'baz']) // 'foobar:baz'
```

Object arguments will have their `toString` method called before concatenation

```javascript
var fn = builder('foo')
fn({ toString: function () {return 'bar'} }) // 'foobar'
```

Api
---

#### `factory(base='', joiner='')` ####

Factory function that optionally takes a `base` and a `joiner` and returns a function to call to build strings with. `base` and `joiner` should both be a strings, or cast to strings. Returns the builder function. 

`joiner` is used to join any array arguments passed into the builder before concatenation.

#### `builder(args...)` ####

Concatenates arguments together and with the `base` string provided by the factory.

If an arg is an array, it will be joined with the `joiner` provided by the factory before concatenation with the base and other arguments.

If an arg is an object, it will have its toString method called on it before concatenation with the base and other arguments.

License
-------

MIT, see LICENSE.md