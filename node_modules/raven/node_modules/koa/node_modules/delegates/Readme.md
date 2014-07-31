
# delegates

  Node method and accessor delegation utilty.

## Installation

```
$ npm install delegates
```

## Example

```js
var delegate = require('delegates');

...

delegate(proto, 'request')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .method('acceptsCharsets')
  .method('accepts')
  .method('is')
  .access('querystring')
  .access('idempotent')
  .access('socket')
  .access('length')
  .access('query')
  .access('search')
  .access('status')
  .access('method')
  .access('path')
  .access('body')
  .access('host')
  .access('url')
  .getter('subdomains')
  .getter('protocol')
  .getter('header')
  .getter('stale')
  .getter('fresh')
  .getter('secure')
  .getter('ips')
  .getter('ip')
```

# License

  MIT