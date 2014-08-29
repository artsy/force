Search = require '../../collections/search'
GoogleSearchResults = require './collections/google_search_results.coffee'
removeDiacritics = require('diacritics').remove

@index = (req, res) ->
  term = req.query.q
  return res.redirect("/") unless term
  res.locals.sd.term = term
  results = new GoogleSearchResults()

  results.fetch
    dataType: 'jsonp'
    data:
      q: removeDiacritics(term) # Google appears to not like accents :shrug:
    success: ->
      models = results.moveMatchResultsToTop term
      res.locals.sd.RESULTS = results.toJSON()
      res.render 'template',
        term: term
        referrer: req.query.referrer
        results: models
    error: ->
      res.render 'template',
        term: term
        referrer: req.query.referrer
        results: []
