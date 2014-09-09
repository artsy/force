Search = require '../../collections/search'
GoogleSearchResults = require './collections/google_search_results.coffee'
removeDiacritics = require('diacritics').remove

@index = (req, res) ->
  data = {}
  term = req.query.q
  return res.redirect("/") unless term
  data = { q: term }
  res.locals.sd.term = term

  if page = Number(req.query.page)
    res.locals.sd.page = page
    data.start = page * 10

  results = new GoogleSearchResults()
  results.fetch
    dataType: 'jsonp'
    data: data
    success: (results, response) ->
      totalPages = Math.floor(response.queries?.nextPage?[0].totalResults / 10)
      # Google docs say they only supports 10 pages
      # They seem to support a few more but it is unreliable
      totalPage = 10 if totalPages > 10

      models = results.moveMatchResultsToTop term
      res.locals.sd.RESULTS = results.toJSON()
      res.render 'template',
        term: term
        referrer: req.query.referrer
        results: models
        currentPage: page or 1
        totalPages: totalPages
    error: ->
      res.render 'template',
        term: term
        referrer: req.query.referrer
        results: []
