Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class PopularArtistsView extends Backbone.View
  initialize: ({ @artists }) ->
    throw new Error 'Requires artists' unless @artists?

    @listenTo @artists, 'reset', @render

  render: ->
    @$('.artwork-column').last().prepend template
      artists: @artists.models
