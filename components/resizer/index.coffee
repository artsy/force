_ = require 'underscore'
qs = require 'querystring'
{ EMBEDLY_KEY } = require('sharify').data
baseUrl = 'https://i.embed.ly/1/display'

module.exports =
  resize: (url, options = {}) ->
    options = _.defaults options, quality: 95, grow: false, url: url, key: EMBEDLY_KEY
    "#{baseUrl}/resize?#{qs.stringify(options)}"

  crop: (url, options = {}) ->
    options = _.defaults options, quality: 95, url: url, key: EMBEDLY_KEY
    "#{baseUrl}/crop?#{qs.stringify(options)}"

  fill: (url, options = {}) ->
    options = _.defaults options, quality: 95, color: 'fff', url: url, key: EMBEDLY_KEY
    "#{baseUrl}/fill?#{qs.stringify(options)}"
