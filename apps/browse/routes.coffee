FilterSuggest = require '../../models/filter_suggest'

@index = (req, res) ->
  filterSuggest = new FilterSuggest id: 'main'
  filterSuggest.fetch
    cache: true
    success: ->
      res.render 'index',
        filterRoot: '/browse/artworks'
        mediums: filterSuggest.mediumsHash()
