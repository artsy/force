_ = require 'underscore'
EMBEDLY_KEY = 'a1f82558d8134f6cbebceb9e67d04980'
USE_RESIZE_PROXY = true
baseUrl = 'https://i.embed.ly/1/display'

module.exports =
  resize: (url, width, height, options = {}) ->
    if USE_RESIZE_PROXY
      url = encodeURIComponent url
      _.defaults options, quality: 95, grow: true
      "#{baseUrl}/resize?key=#{EMBEDLY_KEY}&url=#{url}&width=#{width}&height=#{height}&quality=#{options.quality}&grow=#{options.grow}"
    else
      url

  crop: (url, width, height, options = {}) ->
    if USE_RESIZE_PROXY
      url = encodeURIComponent url
      _.defaults options, quality: 95
      "#{baseUrl}/crop?key=#{EMBEDLY_KEY}&url=#{url}&width=#{width}&height=#{height}&quality=#{options.quality}"
    else
      url

  fill: (url, width, height, options = {}) ->
    if USE_RESIZE_PROXY
      url = encodeURIComponent url
      _.defaults options, quality: 95, color: 'fff'
      "#{baseUrl}/fill?key=#{EMBEDLY_KEY}&url=#{url}&width=#{width}&height=#{height}&quality=#{options.quality}&color=#{options.color}"
    else
      url