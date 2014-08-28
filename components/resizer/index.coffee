_ = require 'underscore'
qs = require 'querystring'
EMBEDLY_KEY = 'a1f82558d8134f6cbebceb9e67d04980'
USE_RESIZE_PROXY = true
baseUrl = 'https://i.embed.ly/1/display'

module.exports =
  resize: (url, options = {}) ->
    if USE_RESIZE_PROXY
      options = _.defaults options, quality: 95, grow: false, url: url, key: EMBEDLY_KEY
      "#{baseUrl}/resize?#{qs.stringify(options)}"
    else
      url

  crop: (url, options = {}) ->
    if USE_RESIZE_PROXY
      options = _.defaults options, quality: 95, url: url, key: EMBEDLY_KEY
      "#{baseUrl}/crop?#{qs.stringify(options)}"
    else
      url

  fill: (url, options = {}) ->
    if USE_RESIZE_PROXY
      options = _.defaults options, quality: 95, color: 'fff', url: url, key: EMBEDLY_KEY
      "#{baseUrl}/fill?#{qs.stringify(options)}"
    else
      url
