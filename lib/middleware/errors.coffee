_ = require 'underscore'

_.mixin(require 'underscore.string')

# List of URL pieces that have slugs associated and can concievably 404
urlPatterns = [
  'artist'
  'auction-results'
]

module.exports.extractTerm = extractTerm = (url) ->
  parts   = url.split '/'
  term    = _.reject(parts, (x) -> _.contains urlPatterns, x).join ' '

  _.humanize term

module.exports.errorHandler = (err, req, res, next) ->
  # Send 404s over to the search
  if res.statusCode is 404
    res.redirect "/search?q=#{extractTerm(req.url)}&referrer=#{encodeURIComponent(req.url)}"
  else
    next(err)
