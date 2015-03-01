Stylus Caster
=============

Takes an object and tries to cast its values to stylus nodes. Convenient if you have common variables that you want to share with Stylus and JavaScript.

At the moment only handles colours and dimensions (as a separate function)

Usage
-----

Take an object and convert all properties to stylus nodes where possible.

```javascript
var caster = require('stylus-caster')

// Original variables
var variables = {
    foo: 'bar',
    yellow: '#ffe400'
}

// Cast variables
var casted = caster(variables)

// Don't cast strings that don't match to a special node type
// caster.foo stays: 'bar'

// Cast hex values to rgba nodes
// caster.yellow becomes: new Stylus.nodes.RGBA(255, 228, 0, 1)

// Put your variables into the renderer
var stylus = require('stylus')
var renderer = stylus('your-stylus-string-here')
for (var k in casted) {
    renderer.define(k, casted[k])
}
```

Cast numbers to pixel values. Leaves non-numeric values as is.

```javascript
var dimensions = require('stylus-caster/dimensions')

// Original variables
var variables = {
    width: 100
}

// Cast dimension variables
var casted = caster(variables)

// caster.width becomes: new Stylus.nodes.Unit(100, 'px')

// Put your variables into the renderer
var stylus = require('stylus')
var renderer = stylus('your-stylus-string-here')
for (var k in casted) {
    renderer.define(k, casted[k])
}
```

Api
---

#### `caster(variables)` ####

Takes an object and returns a new object with the same keys but casted values. Casts hex values (`#000000`, `#000`) and colour functions (`rgb(...)`, `rgba(...)`, `hsl(...)`, and `hsla(...)`) to the appropriate stylus nodes so you can use them as colours in your stylus.

When a value isn't recognised as a specific castable type, it is left as-is.

#### `dimensions(variables)` ####

Takes an object and returns a new object with the same keys but casted values. Casts numeric values to Unit nodes with `'px'` as the unit type so you can use the variables as dimensions in your stylus without adding 'px', etc.

When a value isn't numeric it is left as-is.

License
-------

MIT Licensed. See LICENSE.md for more information.