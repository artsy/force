Search = require '../../collections/search'

@index = (req, res) ->
  term    = req.query.q
  search  = new Search
  search.fetch
    data: { term: term }
    success: ->
      res.render 'template',
        results: search.models
        term: term
    error: res.backboneError
