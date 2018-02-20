SearchResults = require '../../collections/search_results'
removeDiacritics = require('diacritics').remove

module.exports.index = (req, res, next) ->
  return res.redirect('/') unless req.query.term

  term = removeDiacritics req.query.term
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
