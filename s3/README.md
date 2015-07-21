NCalls
======

Methods for deploying an SPA to s3 and uploading individual files. 

Usage
-----

```javascript
var aws = { 
    key: '', 
    secret: '', 
    region: 'ap-southeast-1', 
    bucket: 'smallmu-sandbox'
}

// Deploying an SPA
var deployFactory = require('@smallmultiples/s3')
var deploy = deployFactory({ aws, aws })
deploy('path/to/app/**/*', 'path/to/destination', {
    base: 'path/to/app'
    versioning: false
}, function (err) {
    if (err) console.error(err)
})

// Uploading an individual file
var upload = require('@smallmultiples/s3/file')
upload({
    src: 'path/to/src.ext'
    dest: 'path/to/dest.ext'
    aws: aws
    gzip: true
}, function (err) {
    if (err) console.error(err)
})
```

API
---

#### `deployFactory(options)` ####

Create the `deploy()` function, takes an `options` object, which has the following properties:

* `aws`: Object containing aws credentials:
    * `key`: Your aws Access Key
    * `secret`: Your aws Secret
    * `region`: The region your s3 bucket lives in
    * `bucket`: The bucket to upload to
* `concurrent`: How many concurrent uploads to run. Defaults to `20`.
* `cache`: An object describing the cache settings as described by [gulp-awspublish-router][awspublishRouter]
    * `cacheTime`: How long to cache for in milliseconds. Defaults to 1 year.
* `routes`: A function that given a file path returns an object describing how it should be uploaded. See [gulp-awspublish-router][awspublishRouter] for more information. Defaults to:
    ```javascript
    function (path) {
        return {
            // Text assets get gzipped
            '^.+\.(?:json|js|css|topojson|geojson|svg)$': {
                gzip: true
              , key: path + '$&'
            }
            // HTML gets shorter cache time
          , '^.+\.html$': {
                gzip: true
              , key: path + '$&'
              , cacheTime: 1000 * 60 * 5 // 5 minutes
            }
            // Passthrough for everything else
          , '^.+$': path + '$&'
        }
    }
    ```
[awspublishRouter]: https://npmjs.com/gulp-awspublish-router

#### `deploy(src, dest, options, callback)` ####

Deploys the files described by `src` to `dest`, calling `callback` when it's done or there is an error.

* `src`: Gulp style file path or array of file paths.
* `dest`: Destination path to upload to, e.g., `'/your/app'`
* `options`: Deploy specific options:
    * `base`: The base path of the `src` to remove when deploying files to `dest`.
    * `versioning`: Whether to turn on versioning. Default true. We use [gulp-rev-all][revall].
* `callback(err)`: Called after all files are uploaded, if there was an error it will be the first argument.


[revall]: https://npmjs.com/gulp-rev-all

#### `uploadFile(options, callback)` ####

Uploads a single file to a single location on s3. Lets you specify cache time and if you want it gzipped or not. 

* `options`: An object with the following parameters:
    * `src`: The file to upload
    * `dest`: The place to put it on s3
    * `aws`: Your aws credentials object:
        * `key`: Your aws Access Key
        * `secret`: Your aws Secret
        * `region`: The region your s3 bucket lives in
        * `bucket`: The bucket to upload to
    * `cache`: An object describing the cache settings as described by [gulp-awspublish-router][awspublishRouter], or an integer value of milliseconds to cache for (defaults to 1 year)
    * `gzip`: Whether or not to gzip the file. Default `false`.