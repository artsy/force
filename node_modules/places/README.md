
# Places

Tiny module used for making location queries at Artsy.

## Example

````coffeescript
_ = require 'underscore'
{Cities} = require 'places'

ny = _.findWhere Cities, slug: 'new-york'
````

## License

MIT