# Logger

Use this object to log an array of strings under a namespace and persist it in a Cookie.

## Usage
```coffeescript
logger = new Logger 'for-something'

logger.log 'foo'

logger.hasLogged 'foo' # => true
logger.hasLogged 'bar' # => false

logger.log 'bar', 'baz'

logger.hasLogged 'foo', 'bar', 'baz' # => true
logger.hasLogged 'foo', 'bar', 'baz', 'qux' # => false
```
