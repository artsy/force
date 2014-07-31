# Statuses

HTTP status utility for node.

## API

```js
var status = require('statuses');
```

### var code = status(Integer || String)

If `Integer` or `String` is a valid HTTP code or status message, then the appropriate `code` will be returned. Otherwise, an error will be thrown.

```js
status(403) // => 403
status('403') // => 403
status('forbidden') // => 403
status('Forbidden') // => 403
status(306) // throws, as it's not supported by node.js
```

### status.codes

Returns an array of all the status codes as `Integer`s.

### var msg = status[code]

Map of `code` to `status message`. `undefined` for invalid `code`s.

```js
status[404] // => 'Not Found'
```

### var code = status[msg]

Map of `status message` to `code`. `msg` can either be title-cased or lower-cased. `undefined` for invalid `status message`s.

```js
status['not found'] // => 404
status['Not Found'] // => 404
```

### status.redirect[code]

Returns `true` if a status code is a valid redirect status.

```js
status.redirect[200] // => undefined
status.redirect[301] // => true
```

### status.empty[code]

Returns `true` if a status code expects an empty body.

```js
status.empty[200] // => undefined
status.empty[204] // => true
status.empty[304] // => true
```

### status.retry[code]

Returns `true` if you should retry the rest.

```js
status.retry[501] // => undefined
status.retry[503] // => true
```

## License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.