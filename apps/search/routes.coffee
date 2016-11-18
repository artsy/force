Search = require '../../collections/search'
GlobalSearchResults = require './collections/global_search_results'
removeDiacritics = require('diacritics').remove
{ crop, fill } = require '../../components/resizer'
request = require 'superagent'
imageUrl = require './components/image_url'

@image = (req, res, next) ->
  { id, model } = req.params

  img = request.get imageUrl model, id

  img.on 'end', ->
    res.status img.res.statusCode

  req
    .pipe img
    .pipe res

@index = (req, res) ->
  return res.redirect("/") unless req.query.q

  term = removeDiacritics req.query.q
  data = { term: term, size: 10 }
  res.locals.sd.term = term
  page = Number(req.query.page)
  if page && page > 1
    res.locals.sd.page = page
    data.page = page

  results = new GlobalSearchResults()
  results.fetch
    dataType: 'jsonp'
    data: data
    cache: false
    cacheTime: 60 # 1 minute
    success: (results, response) ->
      totalPages = Math.floor(900 / 10)
      totalPages = 99 if totalPages > 99

      models = results.moveMatchResultsToTop term
      res.locals.sd.RESULTS = results.toJSON()
      res.render 'template',
        term: term
        referrer: req.query.referrer
        results: models
        currentPage: page or 1
        totalPages: totalPages
        crop: crop
        fill: fill
    error: ->
      res.render 'template',
        term: term
        referrer: req.query.referrer
        results: []
