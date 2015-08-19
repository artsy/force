_ = require 'underscore'
qs = require 'querystring'
{ DISABLE_IMAGE_PROXY, EMBEDLY_KEY, GEMINI_CLOUDFRONT_URL, DISABLE_GEMINI_PROXY } = require('sharify').data
baseUrl = 'https://i.embed.ly/1/display'

fetch = (method, options) ->
  if DISABLE_IMAGE_PROXY then options.url else "#{baseUrl}/#{method}?#{qs.stringify(options)}"

fetchGemini = (options) ->
  "#{GEMINI_CLOUDFRONT_URL}/?#{qs.stringify(options)}"

module.exports =
  resize: (url, options = {}) ->
    fetch 'resize', _.defaults(options, quality: 95, grow: false, url: url, key: EMBEDLY_KEY)

  resizeWithGemini: (url, options = {}) ->
    if DISABLE_GEMINI_PROXY
      fetch 'resize', _.omit _.defaults(options, quality: 95, grow: false, url: url, key: EMBEDLY_KEY), 'token', 'resize_to'
    else
      fetchGemini _.defaults(options, quality: 95)

  crop: (url, options = {}) ->
    fetch 'crop', _.defaults(options, quality: 95, url: url, key: EMBEDLY_KEY)

  fill: (url, options = {}) ->
    fetch 'fill', _.defaults(options, quality: 95, color: 'fff', url: url, key: EMBEDLY_KEY)
