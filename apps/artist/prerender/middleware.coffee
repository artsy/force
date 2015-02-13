qs = require 'querystring'
Referer = require 'referer-parser'
Reflection = require './reflection'

module.exports.Predicate = Predicate =
  coinToss: ->
    Math.random() < 0.5

  validReferrer: (url = '') ->
    new Referer(url).medium is 'search'

  evaluate: (req, cb, next) ->
    if (Predicate.validReferrer(req.get 'Referer') and Predicate.coinToss()) then cb() else next()

module.exports.maybePrerender = (req, res, next) ->
  if req.query.prerender
    new Reflection(path: req.path).render (response) ->
      res.send response
    , next
  else
    Predicate.evaluate req, ->
      req.query.prerender = true
      res.redirect req.path + '?' + qs.stringify(req.query)
    , next
