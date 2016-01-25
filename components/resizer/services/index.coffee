qs = require 'qs'
{ compact } = require 'underscore'
{ defaults, enabled } = require '../config.coffee'

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
      throw new Error 'requires `width || height`'
    fn url, width, height, quality or defaults.quality

  crop: (fn) -> (url, options = {}) ->
    { width, height, quality } = options
    unless width? and height?
      throw new Error 'requires `width && height`'
    fn url, width, height, quality or defaults.quality

  fill: (fn) -> (url, options = {}) ->
    { width, height, quality, color } = options
    unless width? and height?
      throw new Error 'requires `width && height`'
    fn url, width, height, quality or defaults.quality, color or defaults.color
