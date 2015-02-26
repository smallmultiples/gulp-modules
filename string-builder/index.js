module.exports = builder

// Returns the builder function, providing base and joiner by scope
function builder (base, joiner) {
    base = base || ''
    joiner = joiner || ''

    return function () {
        var str = base
        for (var i = 0; i < arguments.length; i++) {
            str = combine(str, arguments[i])
        }
        return str
    }

    // Wraps logic for combining an individual argument
    function combine (base, arg) {
        if (Array.isArray(arg)) {
            return base + arg.join(joiner)
        }
        if (arg.toString && typeof arg.toString === 'function') {
            arg = arg.toString()
        }
        return base + arg
    }
}