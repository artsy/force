# PageableCollection

`PageableCollection` extends [backbone-pageable](https://github.com/backbone-paginator/backbone-pageable) with some configuration specific to our API (query params and the ability to pluck counts from our responses).

Backbone pageable's collection itself is: "Backbone.PageableCollection is a strict superset of Backbone.Collection and passes its test suite." so you should be able to use it anywhere you use `Backbone.Collection`

## Usage
```coffeescript
PageableCollection = require '../components/pageable_collection/index

module.exports = class PageableArtists extends PageableCollection
```

Use with the pagination template mixin:
```jade
+paginate(pageableArtists.state.currentPage, pageableArtists.state.totalPages)
```
