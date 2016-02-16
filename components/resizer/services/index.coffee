{ NODE_ENV } = require('sharify').data
qs = require 'qs'
{ compact } = require 'underscore'
{ defaults, enabled } = require '../config.coffee'

warn = (message) ->
  console.warn message if NODE_ENV is 'development'

module.exports =
  exec: (endpoint, path, options = {}) ->
    if enabled
      [compact([endpoint, path]).join('/'), qs.stringify options]
        .join '?'
    else
      options.url

  resize: (fn) -> (url, options = {}) ->
    { width, height, quality } = options

    unless width? or height?
      warn 'requires `width || height`'
      return url

    if width? and width is 0
      warn '`width` must be non-zero'
      return url

    if height? and height is 0
      warn '`height` must be non-zero'
      return url

    fn url, width, height, quality or defaults.quality

  crop: (fn) -> (url, options = {}) ->
    { width, height, quality } = options

    unless width? and height?
      warn 'requires `width && height`'
      return url

    if width is 0
      warn '`width` must be non-zero'
      return url

    if height is 0
      warn '`height` must be non-zero'
      return url

    fn url, width, height, quality or defaults.quality

  fill: (fn) -> (url, options = {}) ->
    { width, height, quality, color } = options

    unless width? and height?
      warn 'requires `width && height`'
      return url

    if width is 0
      warn '`width` must be non-zero'
      return url

    if height is 0
      warn '`height` must be non-zero'
      return url

    fn url, width, height, quality or defaults.quality, color or defaults.color
