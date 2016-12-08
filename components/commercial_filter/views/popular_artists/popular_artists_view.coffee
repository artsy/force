Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class PopularArtistsView extends Backbone.View
  initialize: ({ @artists, @params }) ->
    throw new Error 'Requires artists' unless @artists?

    @listenTo @artists, 'reset', @render

  render: ->
    if @params.get('medium') in ['design', 'jewelry']
      $('.cf-popular_artists').hide()
    else
      $('.cf-popular_artists').show()
      @$('.artwork-column').last().prepend template
        artists: @artists.models
