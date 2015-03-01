var test = require('tape')
var caster = require('../caster')
var dimensions = require('../dimensions')

test('Don\'t convert nodes we don\'t understand', function (t) {
    t.plan(1)

    var variables = { foo: 'bar' }
    var casted = caster(variables)

    t.equals(casted.foo, 'bar', 'Don\'t cast strings')

    t.end()
})

test('Converts hex to colour nodes', function (t) {
    t.plan(8)

    var variables = { black: '#000000', white: '#FFF' }
    var casted = caster(variables)

    t.equals(casted.black.r, 0, 'Red in #XXxxxx')
    t.equals(casted.black.g, 0, 'Green in #xxXXxx')
    t.equals(casted.black.b, 0, 'Blue in #xxxxXX')
    t.equals(casted.black.a, 1, 'No alpha set')

    t.equals(casted.white.r, 255, 'Red in #Xxx')
    t.equals(casted.white.g, 255, 'Green in #xXx')
    t.equals(casted.white.b, 255, 'Blue in #xxX')
    t.equals(casted.white.a, 1, 'No alpha set')

    t.end()
})

test('Converts function colours to colour nodes', function (t) {
    t.plan(16)

    var variables = {
        black: 'rgb(0, 0, 0)'
      , white: 'rgba(255, 255, 255, 0.5)'
      , red: 'hsl(0, 100, 100)'
      , blue: 'hsla(200, 100, 100, 0.5)'
    }
    var casted = caster(variables)

    t.equals(casted.black.r, 0, 'Red in rgb(X,x,x)')
    t.equals(casted.black.g, 0, 'Green in rgb(x,X,x)')
    t.equals(casted.black.b, 0, 'Blue in rgb(x,x,X)')
    t.equals(casted.black.a, 1, 'No alpha set')

    t.equals(casted.white.r, 255, 'Red in rgba(X,x,x,x)')
    t.equals(casted.white.g, 255, 'Green in rgba(x,X,x,x)')
    t.equals(casted.white.b, 255, 'Blue in rgba(x,x,X,x)')
    t.equals(casted.white.a, 0.5, 'Alpha in rgba(x,x,x,X')

    t.equals(casted.red.h, 0, 'Hue in hsl(X,x,x)')
    t.equals(casted.red.s, 100, 'Saturation in hsl(x,X,x)')
    t.equals(casted.red.l, 100, 'Lightness in hsl(x,x,X)')
    t.equals(casted.red.a, 1, 'Alpha in hsla(x,x,x,X')

    t.equals(casted.blue.h, 200, 'Hue in hsla(X,x,x)')
    t.equals(casted.blue.s, 100, 'Saturation in hsla(x,X,x)')
    t.equals(casted.blue.l, 100, 'Lightness in hsla(x,x,X)')
    t.equals(casted.blue.a, 0.5, 'Alpha in hsla(x,x,x,X')

    t.end()
})

test('Converts dimensions', function (t) {
    t.plan(2)

    var variables = {
        width: 100
    }
    var casted = dimensions(variables)

    t.equals(casted.width.val, 100)
    t.equals(casted.width.type, 'px')

    t.end()
})