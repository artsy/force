Backbone = require 'backbone'
_ = require 'underscore'
relatedPostsTemplate = ->   require('../templates/related_posts.jade') arguments...

module.exports = class RelatedPostsView extends Backbone.View

  initialize: (options) ->
    { @numToShow } = options
    @render()

  render: ->
    @$el.html relatedPostsTemplate posts: @collection.models