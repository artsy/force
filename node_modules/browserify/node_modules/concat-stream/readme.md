# concat-stream

Writable stream that concatenates strings or binary data and calls a callback with the result. Not a transform stream -- more of a stream sink.

[![NPM](https://nodei.co/npm/concat-stream.png)](https://nodei.co/npm/concat-stream/)

[![browser support](https://ci.testling.com/maxogden/node-concat-stream.png)](https://ci.testling.com/maxogden/node-concat-stream)

### examples

```js
var concat = require('concat-stream')
var fs = require('fs')
    
var read = fs.createReadStream('readme.md')
var write = concat(function(data) {})
    
read.pipe(write)
```

works with arrays too!

```js
var write = concat({ encoding: 'array' }, function(data) {})
write.write([1,2,3])
write.write([4,5,6])
write.end()
// data will be [1,2,3,4,5,6] in the above callback
```

works with buffers too! can't believe the deals!

```js
var write = concat(function(data) {})
write.write(new Buffer('hello '))
write.write(new Buffer('world'))
write.end()
// data will be a buffer that toString()s to 'hello world' in the above callback
```    

or if you want a Uint8Array, you can have those too!

```js
var write = concat({ encoding: 'u8' }, function(data) {})
var a = new Uint8Array(3)
a[0] = 97; a[1] = 98; a[2] = 99
write.write(a)
write.write('!')
write.end(Buffer('!!1'))
```

# methods

```js
var concat = require('concat-stream')
```

## var writable = concat(opts={}, cb)

Return a `writable` stream that will fire `cb(data)` with all of the data that
was written to the stream. Data can be written to `writable` as strings,
Buffers, arrays of byte integers, and Uint8Arrays. 

Use `opts.encoding` to control what format `data` should be:

* string - get a string
* buffer - get back a Buffer (this is the default encoding)
* array - get an array of byte integers
* uint8array, u8, uint8 - get back a Uint8Array

# license

MIT LICENSE
