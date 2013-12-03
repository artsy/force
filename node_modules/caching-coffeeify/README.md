# caching-coffeeify [![build status](https://secure.travis-ci.org/thlorenz/caching-coffeeify.png)](http://travis-ci.org/thlorenz/caching-coffeeify)

A [coffeeify](https://github.com/substack/coffeeify) version that caches previously compiled coffee-script to optimize the coffee-script compilation step.


## Installation

    npm install caching-coffeeify

## API

The API is exactly the same as original coffeeify, so pleas refer to its [documentation](https://github.com/substack/coffeeify/blob/master/readme.markdown)

## Note

The caching only adds benefit if you are compiling and building the bundle on the fly on a running server. If you are
using coffeeify as part of the build script or from the command line, caching doesn't add any benefit and you should use
the [orginal coffeeify](https://github.com/substack/coffeeify) instead.
