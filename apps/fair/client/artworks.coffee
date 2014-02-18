_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
FilterArtworksView      = require '../../../components/filter/artworks/view.coffee'

module.exports = class ArtworksView extends Backbone.View

  headerText: ->
    if @filter.category
      "Artworks in #{@filter.category.split('-').join(' ')}"
    else
      'All Artworks'

  initialize: (options) ->
    { @filter, @fair, @profile } = options

    @$('h1').text @headerText()
    unless sd.NODE_ENV == 'test'
      @$el.show()
