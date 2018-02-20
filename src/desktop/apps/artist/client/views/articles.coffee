_ = require 'underscore'
Backbone = require 'backbone'
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
template = -> require('../../templates/sections/articles.jade') arguments...
sd = require('sharify').data
query = require '../../queries/articles.coffee'
metaphysics = require '../../../../../lib/metaphysics.coffee'
ArtistArtworksView = require './artworks.coffee'

module.exports = class ArticlesView extends ArtistArtworksView
  initialize: ->
    @listenTo this, 'artist:articles:sync', @render

  fetchRelated: ->
    metaphysics
      query: query
      variables:
        artist_id: @model.get('id')
    .then ({ artist }) => @trigger 'artist:articles:sync', artist

  postRender: ->
    super
    $el = @$('#artist-related-articles-section').show()
    _.defer -> $el.addClass 'is-fade-in'

  render: ( { articles, counts } = {} )->
    @$el.html template
      artist: @model
      articles: articles
    if articles?.length == 0
      @$('#artist-related-articles-section').remove()
    super
    this
