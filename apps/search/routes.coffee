Search = require '../../collections/search'

@index = (req, res) ->
  term    = req.query.q
  # Clean up query.q. Sometimes is returned as term?q=term
  term    = term.split('?q=')[0]
  search  = new Search
  search.fetch
    data: { term: term }
    success: ->
      res.render 'template',
        results: search.models
        term: term
        referrer: req.query.referrer
    error: res.backboneError
