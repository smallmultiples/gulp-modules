module.exports = cast

var stylus = require('stylus')

var hex = /^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/

// Each digit of the rgb can be preceded and succeeded by * spaces
var rgb = /rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/

// Each digit of the rgba can be preceded and succeeded by * spaces
// The alpha can optionally be a digits, period and then more digits.
var rgba = /rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0|1](?:.\d+)?)\s*\)/

// Each digit of the rgb can be preceded and succeeded by * spaces
var hsl = /hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/

// Each digit of the rgba can be preceded and succeeded by * spaces
// The alpha can optionally be a digits, period and then more digits.
var hsla = /hsla\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0|1](?:.\d+)?)\s*\)/


/**
 * Creates a stylus RGBA node
 */
function makeRGBA (r, g, b, a) {
    return new stylus.nodes.RGBA(+r, +g, +b, +a)
}

/**
 * Creates a stylus HSLA node
 */
function makeHSLA (h, s, l, a) {
    return new stylus.nodes.HSLA(+h, +s, +l, +a)
}

/**
 * Takes a stylus instance and adds vars to it. It has some intelligence about
 * turning strings into their proper values e.g., rgba(255, 0, 0, 0.5)
 */
function cast (vars) {
    var ret = {}
    for (k in vars) {
        var v = vars[k]
        if (typeof v === 'string') {
            // HEX
            var matched
            if (matched = v.match(hex)) {
                if (v.length === 4) {
                    var r = matched[1].slice(0, 1)
                    r = parseInt(r + '' + r, 16)
                    var g = matched[1].slice(1, 2)
                    g = parseInt(g + '' + g, 16)
                    var b = matched[1].slice(2, 3)
                    b = parseInt(b + '' + b, 16)
                }
                else {
                    var r = parseInt(matched[1].slice(0, 2), 16)
                    var g = parseInt(matched[1].slice(2, 4), 16)
                    var b = parseInt(matched[1].slice(4, 6), 16)
                }
                ret[k] = makeRGBA(r, g, b, 1)
                continue
            }

            // RGB = RGBA with A of 1
            if (matched = v.match(rgb)) {
                ret[k] = makeRGBA.apply(null, matched.slice(1).concat([1]))
                continue
            }

            // RGBA
            if (matched = v.match(rgba)) {
                ret[k] = makeRGBA.apply(null, matched.slice(1))
                continue
            }

            // HSL = HSLA with A of 1
            if (matched = v.match(hsl)) {
                ret[k] = makeHSLA.apply(null, matched.slice(1).concat([1]))
                continue
            }

            // HSLA
            if (matched = v.match(hsla)) {
                ret[k] = makeHSLA.apply(null, matched.slice(1))
                continue
            }

            // Normal string, still needs to be defined
            ret[k] = v
        }
        else {
            ret[k] = v
        }

    }

    return ret
}