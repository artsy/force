# artsy-backbone-mixins

A library of Backbone mixins that DRY up some common domain logic and Artsy API rabbit holes. Used internally at Artsy, but maybe you'll find some useful patterns here.

Functions are namespaced by common sets of functionality such as "Markdown", "Image", or "Dimensions".

````coffeescript
_ = require 'underscore'
{ Markdown, Image } = require 'artsy-backbone-mixins'

class Artwork extends Backbone.Model

  _.extend @prototype, Markdown
  _.extend @prototype, Image
````

## Markdown

````coffeescript
{ Markdown } = require 'artsy-backbone-mixins'

class Artwork extends Backbone.Model

  _.extend @prototype, Markdown

````

### mdToHtml(attr)

Converts an attribute into markdown using showdown.js

````coffeescript
artist.mdToHtml('biography')
````

### mdToHtmlToText(attr)

Converts an attribute into markdown & escapes html.

````coffeescript
artist.mdToHtmlToText('biography')
````

### htmlToText(attr)

Escapes html from an attribute.

````coffeescript
artist.htmlToText('biography')
````

## Dimensions

````coffeescript
{ Dimensions } = require 'artsy-backbone-mixins'

class Artwork extends Backbone.Model

  _.extend @prototype, Dimensions

````

### dimensions([options])

Commonly dimensions in Artsy's API are structured like `{ dimensions: { in: "10 x 20" }, metric: "in" }`. This provides a convenient method for outputting a formatted dimension string based on this data. Pass in some options for better formatting.

````coffeescript
artist.set { dimensions: { in: "10 x 20 in", cm: '13 1/2 x 24  2/3 cm' }, metric: "in" }
artist.dimensions() # '10 x 20 in'
artist.dimensions(metric: 'cm') # 13 1/2  x 24 2/3 cm
artist.dimensions(metric: 'cm', format: 'superscript') # 13 ½  x 24 ⅔ cm
artist.dimensions(metric: 'cm', format: 'decimal') # 13.5  x 24.33 cm
````

#### options.metric: ('in' or 'cm') (defaults to `@get('metric')`)

````coffeescript
artist.dimensions(metric: 'cm')
````

#### options.format: 'superscript'

Turns 10 3/4 into superscript html like 10 `<sup>3/4</sup>`.

````coffeescript
artist.dimensions(format: 'superscript')
````

#### options.format: 'decimal'

Converts porely formatted metric dimensions that appear as fractions into a proper metric decimal formatting.

````coffeescript
artist.dimensions(format: 'decimal')
````

## Fetch

_Remember to pass in the artsy url._

````coffeescript
{ Fetch } = require 'artsy-backbone-mixins'
{ ARTSY_URL } = require('sharify').data

class Artworks extends Backbone.Collection

  _.extend @prototype, Fetch(ARTSY_URL)

````

### fetchUntilEnd(options)

For paginated routes, fetches the collection's url until the endpoint returns 0 results.

````coffeescript
artworks.fetchUntilEnd success: ->
  # Phew... I have all the artworks from Artsy
````

### fetchSetItemsByKey(key, options)

Fetches a set by key and populates the collection with the first result.

````coffeescript
featuredLinks.fetchSetItemsByKey 'homepage:featured-sections', success: ->
  featuredLinks.first().get('name').should.equal 'Magnum Photos'
````

## AToZ

````coffeescript
{ Fetch } = require 'artsy-backbone-mixins'
{ AToZ } = require('sharify').data

class Artworks extends Backbone.Collection

  _.extend @prototype, AToZ

````

### groupByAlpha

Sorts a collection groupped alphabetically based on the `alphaSortKey` function on the model. If there is no `alphaSortKey` function on the model it will default to `@get 'sortable_id'`.

Sample output:

````
{
  '0-9': [ model_instance, model_instance, model_instance ],
  A: [ model_instance, model_instance, model_instance ],
  // ...
  Z: [ model_instance, model_instance, model_instance ]
}
````

````coffeescript
artworks.model.alphaSortKey = -> @get 'title'
artworks.groupByAlpha()
````

### groupByAlphaWithColumns

Groups collection output in a format suitable for rendering in an A-Z list with a specified number of columns. The models must implement a `href` and `displayName` method.

Sample output:

````
[
 { letter: '0-9', columns: [ ... ] },
 { letter: 'A', columns: [ ... ] },
  ...
 { letter: 'Z', columns: [ ... ] }
]
// Each column is a 2D array of objects with `href`, and `name` properties:
columns: [
  [ { href: '...', name: '...' }, ... { href: '...', name: '...' } ],
  [ { href: '...', name: '...' }, ... { href: '...', name: '...' } ],
  [ { href: '...', name: '...' }, ... { href: '...', name: '...' } ]
]
````

````coffeescript
artworks.model.href = -> "/artwork/#{@get 'id'}"
artworks.model.displayName = -> @get 'title'
artworks.groupByAlphaWithColumns()
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `npm test`.

## License

MIT
