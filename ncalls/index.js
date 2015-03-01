module.exports = ncalls

// Convenience function for running a cb after it is called n times
function ncalls (count, cb) {
    var counter = 0
    return function() {
        if (++counter === count) cb()
    }
}