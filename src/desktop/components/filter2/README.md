## Artworks FilterView v.2

Sets up a view of filtered artworks with a filter and sort bar. This component uses [Gravity's ElasticSearch Filter endpoint](https://github.com/artsy/gravity/blob/master/app/api/v1/filter_endpoint.rb).

### Rendering the filter server-side

The initial render of the component is done server side. Using the tag app as an example:

```coffeescript
Backbone = require 'backbone'
Tag = require '../../models/tag'
FilterArtworks = require '../../collections/filter_artworks'
aggregationParams = require './aggregations.coffee'

@index = (req, res, next) ->
  tag = new Tag(id: req.params.id)
  filterArtworks = new FilterArtworks
  params = new Backbone.Model tag: tag.id
  filterData = { size: 0, tag: req.params.id, aggregations: aggregationParams }

  Promise.all([
    tag.fetch(cache: true)
    filterArtworks.fetch(data: filterData)
  ]).done ->
    res.locals.sd.FILTER_ROOT = tag.href() + '/artworks'
    res.locals.sd.TAG = tag.toJSON()

    res.render 'index',
      tag: tag
      filterRoot: res.locals.sd.FILTER_ROOT
      counts: filterArtworks.counts
      params: params
      activeText: ''
```

The aggregationParams file is an array of the aggregation params you want back from the server:

```coffeescript
module.exports = ['dimension_range', 'medium', 'price_range', 'total']
```

And the template:

```jade
    #tag-filter
      #tag-filter-nav.filter-fixed-header-nav
        .filter-fixed-header-left
          = tag.get('name')
          | &nbsp;&mdash;&nbsp;
          em
            span.filter-artworks-num
            | &nbsp;Works
        span#tag-filter-artworks-nav
          include ../../components/filter2/dropdown_group/template
      #tag-artworks
        include ../../components/filter2/template
```

The filter templates expect to have `counts`, `params`, and `filterRoot`. The client-side needs a `FILTER_ROOT` var.

### Setting up the filter client-side

On the client-side, you can use the same aggregationParams array that was passed on the server:

```coffeescript
{ TAG } = require('sharify').data
{ setupFilter } = require '../../components/filter2/index.coffee'
aggregationParams = require './aggregations.coffee'

module.exports.init = ->
  tag = new Tag TAG

  setupFilter
    el: $ '#tag-filter'
    stuckFacet: tag
    stuckParam: 'tag_id'
    aggregations: aggregationParams

```

`stuckParam` refers to the param that will always be passed to the server related to the object you are filtering artworks on (in this case `tag_id`, but could be `partner_id`, `fair_id`, etc.). `stuckFacet` is the actual model you are filtering on.

Additionally, the setupFilter method returns `params`, `collection`, `view` and `router`. You can listen to these objects and subsequently update your view. i.e.:

```coffeescript
  { params, collection } = setupFilter
    el: $ '#tag-filter'
    stuckFacet: tag
    stuckParam: 'tag_id'
    aggregations: aggregationParams

  collection.on 'sync', -> # do something
  params.on 'change', -> # do another thing

```
