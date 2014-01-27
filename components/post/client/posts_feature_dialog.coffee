_                  = require 'underscore'
Backbone           = require 'backbone'
sd                 = require('sharify').data
Artists            = require('../../../collections/artists.coffee')
Artworks           = require('../../../collections/artworks.coffee')
featurePostArtworkTemplate = -> require('../templates/actions_feature_post_artwork.jade') arguments...
featurePostArtistTemplate = -> require('../templates/actions_feature_post_artist.jade') arguments...

module.exports = class PostsFeatureDialog extends Backbone.View

  events:
    'click .posts-dialog a.close'  : 'hide'
    'click .feature-by-slug'       : 'featureBySlug'

  initialize: ->
    @$postsDialog = @$('.posts-dialog')

  show: ->
    if ! @$postsDialog.is(':visible')
      @loadPosts()
    @$postsDialog.toggleClass 'on'

  hide :-> @$postsDialog.removeClass 'on'

  loadPosts: ->
    @model.ensureFeatureArtistsFetched @displayFeatureArtists
    @model.ensureFeatureArtworksFetched @displayFeatureArtworks

  displayFeatureArtworks: (artworks) =>
    featureArtworks = @$('.posts-dialog ul.artworks')

    artworksCollection = new Artworks( artworks.models )
    for attachment in @model.get('attachments')
      if attachment.type == 'PostArtwork'
        artworksCollection.add attachment.get('artwork')

    html = artworksCollection.map((artwork) =>
      featurePostArtworkTemplate( post: @model, artwork: artwork )
    ).join('')
    featureArtworks.html html

    artworksCollection.map (artwork) => @updateFeatured(artwork)

  displayFeatureArtists: (artists) =>
    featureArtists = @$('.posts-dialog ul.artists')

    artistsCollection = new Artists( artists.models )
    for attachment in @model.get('attachments')
      if attachment.type == 'PostArtwork'
        artist = attachment.artwork?.artist
        artistsCollection.add artist

    html = artistsCollection.map((artist) =>
      featurePostArtistTemplate( post: @model, artist: artist )
    ).join('')
    featureArtists.html html

    artistsCollection.map (artist) =>  @updateFeatured(artist)

  displayFeatureBySlugError: (response) ->
    response.suppressAppMessages = true
    @$('li.slug .error').text _.compact([
      (JSON.parse(response.responseText).error ? response.statusText),
      @$('li.slug .error').text()
    ]).join(", ")

  featureBySlug: (event) ->
    $featureBySlugButton = @$('li.slug a')
    return false if $featureBySlugButton.hasClass('working')
    $featureBySlugButton.addClass('working')

    @$('li.slug .error').text('')

    slug = @$('input[name=feature_slug]').val()
    return unless slug && slug.length > 0

    # Todo: Figure out a better way of getting modelname and model id
    model = new Backbone.Model
    model.save
      url    : "/api/v1/post/#{@model.get('id')}/#{modelName}/#{modelId}/feature",
      success: =>
        @$('li.slug .error').text('')
        @model.set "feature_#{model.modelName}s", null
        @loadPosts()
        $featureBySlugButton.removeClass('working')
      error: (response) =>
        $featureBySlugButton.removeClass('working')
        @displayFeatureBySlugError(response)

  updateFeatured: (model) ->
    modelId = model.get('id')
    modelName = model.modelName
    selector = ".posts-dialog ul.#{modelName}s a[data-#{modelName}_id=#{modelId}]"

    if @model.get("feature_#{model.modelName}s")?.get(model.id)?
      @$(selector).addClass('unfeature_attachment')
    else
      model = new Backbone.Model
      model.save
        url: -> "/api/v1/post/#{@model.get('id')}/#{modelName}/#{modelId}/feature"
        success: =>
          @$(selector).addClass('unfeature_attachment')
        error: (xhr) =>
          @$(selector).addClass('feature_attachment')
