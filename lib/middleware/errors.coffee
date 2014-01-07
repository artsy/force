_ = require 'underscore'

_.mixin(require 'underscore.string')

# List of URL pieces that have slugs associated and can concievably 404
urlPatterns = [
  'artist'
  'auction-results'
]

@extractTerm = extractTerm = (url) ->
  parts   = url.split '/'
  term    = _.reject(parts, (x) -> _.contains urlPatterns, x).join ' '

  _.humanize term

@notFoundError = (err, req, res, next) ->
  # Send 404s over to the search
  if res.statusCode is 404
    res.redirect "/search?q=#{extractTerm(req.url)}&referrer=#{encodeURIComponent(req.url)}"
  else
    next(err)

@loginError = (err, req, res, next) ->
  res.status switch err.message
    when 'invalid email or password' then 403
    else 500
  res.send { error: err.message }