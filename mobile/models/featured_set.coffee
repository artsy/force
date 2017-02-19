_ = require 'underscore'
Backbone = require 'backbone'
{ Markdown } = require 'artsy-backbone-mixins'

module.exports = class FeaturedSet extends Backbone.Model

  _.extend @prototype, Markdown

  models: ->
    if @get('data')? then @get('data').models else []
