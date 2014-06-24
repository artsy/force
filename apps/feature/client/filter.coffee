_                         = require 'underscore'
Backbone                  = require 'backbone'

filterTemplate            = -> require('../templates/artwork_filter.jade') arguments...

module.exports = class FilterView extends Backbone.View

  events:
    'click a' : 'triggerArtworkFilter'

  initialize: ->
    @$el.html filterTemplate()

  triggerArtworkFilter: ->
    console.log 'holler'
