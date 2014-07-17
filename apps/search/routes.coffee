Search = require '../../collections/search'

@index = (req, res) ->
  term = req.query.q
  res.redirect("/") unless term
  search = new Search
  search.fetch
    data: { term: term }
    cache: true
    success: ->
      res.render 'template',
        results: search.models
        term: term
        referrer: req.query.referrer
    error: res.backboneError
