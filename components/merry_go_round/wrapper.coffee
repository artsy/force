_ = require 'underscore'

module.exports = class MerryGoRoundFlickity
  defaults:
    cellSelector: '.js-mgr-cell'
    cellAlign: 'left'
    pageDots: false
    prevNextButtons: false
    accessibility: false # Handled on `document`

  constructor: (@$el, options = {}) ->
    @flickity = new (require 'flickity') @$el[0], _.defaults options, @defaults
