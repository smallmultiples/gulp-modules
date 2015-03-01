module.exports = processDimensions

var stylus = require('stylus')

/**
 * Creates a stylus node of type unit, dimensions px
 */
function makePixel (number) {
    return new stylus.nodes.Unit(number, 'px')
}

/**
 * Turn the special dimensions object into variables on the
 */
function processDimensions (vars) {
    var ret = {}

    for (key in vars) {
        if (typeof vars[key] === 'number') ret[key] = makePixel(vars[key])
    }

    return ret
}