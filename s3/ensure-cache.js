module.exports = ensureCache

var DEFAULT_CACHE_TIME = 1000 * 60 * 60 * 24 * 365 // 1 year

function ensureCache (cache) {
    if (typeof cache === 'object') return cache
    if (!cache && cache !== 0) cache = DEFAULT_CACHE_TIME
    return { cacheTime: cache }
}