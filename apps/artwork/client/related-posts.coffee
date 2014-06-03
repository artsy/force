_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'

module.exports = class RelatedPostsView extends Backbone.View

  numToShow: 2

  initialize: (options = {}) ->
    @artwork = options.artwork

    @artwork.fetchRelatedPosts()
    @listenTo @artwork.relatedPosts, 'sync', @render

  render: ->
    templateData =
      artwork : @artwork
      mode    : @mode

    if @artwork.relatedPosts.length
      # @$el.html
      #   posts : @artwork.relatedPosts.first @numToShow
    else
      @remove()

    _.defer =>
      if not @__rendered__
        @$('.related-posts').addClass 'is-fade-in'
        @__rendered__ = true
      else
        @$('.related-posts').addClass 'is-rendered'
