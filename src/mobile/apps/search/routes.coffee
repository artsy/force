SearchResults = require '../../collections/search_results'
removeDiacritics = require('diacritics').remove

module.exports.index = (req, res, next) ->
  term = req.query.q || req.query.term
  return res.redirect('/') unless term

  term = removeDiacritics term
  res.locals.sd.term = term

  results = new SearchResults
  indexes = ['Artwork', 'Artist', 'Article', 'Fair', 'Tag', 'Gene', 'Feature', 'Profile', 'PartnerShow', 'Sale']
  data = { term: term, size: 10 }
  data['indexes[]'] = indexes

  results.fetch
    data: data
    cache: true
    cacheTime: 60
    success: (results, response, options) ->
      res.locals.sd.RESULTS = results.toJSON()
      res.render 'template',
        mainHeaderSearchBoxValue: term
        referrer: req.query.referrer
        results: results.models
    error: ->
      res.render 'template',
        mainHeaderSearchBoxValue: term
        referrer: req.query.referrer
        results: []
