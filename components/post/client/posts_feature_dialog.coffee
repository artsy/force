_                  = require 'underscore'
Backbone           = require 'backbone'
sd                 = require('sharify').data
Artists            = require('../../../collections/artists.coffee')
Artworks           = require('../../../collections/artworks.coffee')
featurePostArtworkTemplate = -> require('../templates/actions_feature_post_artwork.jade') arguments...
featurePostArtistTemplate  = -> require('../templates/actions_feature_post_artist.jade') arguments...

module.exports = class PostsFeatureDialog extends Backbone.View

  events:
    'click .feature-by-slug'        : 'featureBySlug'
    'click a.post-dialog-feature'   : 'featurePostOnPage'
    'click a.post-dialog-unfeature' : 'unfeaturePostOnPage'

  getFeatureUrl: (modelName, modelId) ->
    "#{sd.ARTSY_URL}/api/v1/post/#{@model.get('id')}/#{modelName.toLowerCase()}/#{modelId}/feature"

  initialize: ->
    @$postsDialog = @$('.posts-dialog')
    @$error = @$('.slug-container .error')

  show: ->
    unless @$postsDialog.is(':visible')
      @loadPosts()
    @$postsDialog.toggleClass 'on'

  hide :-> @$postsDialog.removeClass 'on'

  loadPosts: ->
    @model.ensureFeatureArtistsFetched @displayFeatureArtists
    @model.ensureFeatureArtworksFetched @displayFeatureArtworks

  displayFeatureArtworks: (artworksCollection) =>
    featureArtworks = @$('.posts-dialog .feature-artworks')

    postArtworks = @model.artworks()
    if postArtworks?.length
      for artwork in postArtworks.models
        artworksCollection.add artwork

    html = artworksCollection.map((artwork) =>
      featurePostArtworkTemplate( post: @model, artwork: artwork )
    ).join('')
    featureArtworks.html html

    artworksCollection.map (artwork) => @updateFeatured(artwork.get('id'), 'artwork')

  displayFeatureArtists: (artistsCollection) =>
    featureArtists = @$('.posts-dialog .feature-artists')

    postArtworks = @model.artworks()
    if postArtworks?.length
      for artwork in postArtworks.models
        artistsCollection.add artwork.get('artist')

    html = artistsCollection.map((artist) =>
      featurePostArtistTemplate( post: @model, artist: artist )
    ).join('')
    featureArtists.html html

    artistsCollection.map (artist) => @updateFeatured(artist.get('id'), 'artist')

  displayFeatureBySlugError: (response) ->
    @$error.text _.compact([
      (JSON.parse(response.responseText).error ? response.statusText),
      @$error.text()
    ]).join(", ")

  featureBySlug: ->
    $featureBySlugButton = @$('.slug-container .feature-by-slug')
    return false if $featureBySlugButton.hasClass('is-loading')
    $featureBySlugButton.addClass('is-loading')
    @$error.text('')

    modelId = @$('input[name=post-feature-model-id]').val()
    return unless modelId && modelId.length > 0

    modelName = @$('input[name=post-feature-model-name]').val()
    return unless modelName && modelName.length > 0

    model = new Backbone.Model
    model.url = @getFeatureUrl(modelName, modelId)
    model.save null,
      success: =>
        alert("Post has been featured to #{sd.ARTSY_URL}/#{modelName.toLowerCase()}/#{modelId}")
        $featureBySlugButton.removeClass('is-loading')
      error: (model, response) =>
        $featureBySlugButton.removeClass('is-loading')
        @displayFeatureBySlugError(response)

  updateFeatured: (modelId, modelName) =>
    selector = ".posts-dialog a[data-#{modelName}_id=#{modelId}]".toLowerCase()
    model = new Backbone.Model()
    model.fetch
      url: @getFeatureUrl(modelName, modelId)
      success: =>
        @$(selector).addClass('post-dialog-unfeature')
      error: (xhr) =>
        @$(selector).addClass('post-dialog-feature')

  featurePostOnPage: (event) ->
    modelName = $(event.target).attr('data-model_name')
    modelId = $(event.target).attr("data-#{modelName}_id")

    model = new Backbone.Model
    model.url = @getFeatureUrl(modelName, modelId)
    model.save
      success: =>
        @loadPosts()
      error: =>
        @loadPosts()

  unfeaturePostOnPage: (event) ->
    modelName = $(event.target).attr('data-model_name')
    modelId = $(event.target).attr("data-#{modelName}_id")

    model = new Backbone.Model(id: _.uniqueId)
    model.destroy
      url: @getFeatureUrl(modelName, modelId)
      success: =>
        @loadPosts()
      error: =>
        @loadPosts()
