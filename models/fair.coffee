sd        = require('sharify').data
_         = require 'underscore'
Backbone  = require 'backbone'
{ Image, Markdown } = require 'artsy-backbone-mixins'
PartnerLocation     = require './partner_location.coffee'
OrderedSets         = require '../collections/ordered_sets.coffee'
Profiles            = require '../collections/profiles.coffee'

module.exports = class Fair extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/fair"

  href: ->
    "/#{@get('organizer')?.profile_id}"

  location: ->
    if @get('location')
      new PartnerLocation @get('location')

  fetchExhibitors: (options) ->
    galleries = new @aToZCollection('show')
    galleries.fetchUntilEnd
      url: "#{@url()}/partners"
      cache: true
      success: ->
        aToZGroup = galleries.groupByAlphaWithColumns 3
        options?.success aToZGroup, galleries
      error: ->
        options?.error()

  fetchArtists: (options) ->
    artists = new @aToZCollection('artist')
    artists.fetchUntilEnd
      url: "#{@url()}/artists"
      cache: true
      success: ->
        aToZGroup = artists.groupByAlphaWithColumns 3
        options?.success aToZGroup, artists
      error: ->
        options?.error()

  fetchSections: (options) ->
    if @get('sections')?.length
      options?.success? @get('sections')
    else
      sections = new Backbone.Collection
      sections.fetch
        cache: true
        url: "#{@url()}/sections"
        success: (sections) =>
          @set 'sections', sections
          options?.success? sections

  setKeys: ['primaryLinks', 'exploreLinks', 'curatorLinks', 'postLinks']
  fetchPrimarySets: (options) ->
    orderedSets = new OrderedSets
    orderedSets.fetchItemsByOwner('Fair', @get('id'), options.cache).then (deferred) =>
      orderedSets.each (set) =>
        @set "#{set.get('key')}Links", set
      options.success orderedSets

  # Custom A-to-Z-collection for fair urls
  aToZCollection: (namespace) =>
    href = @href()
    class FairSearchResult extends Backbone.Model
      href: -> "#{href}/browse/#{namespace}/#{@get('id')}"
      displayName: -> @get('name')
    new class FairSearchResults extends Profiles
      model: FairSearchResult

  fetchShowForPartner: (partnerId, options) ->
    shows = new Backbone.Collection
    shows.url = "#{@url()}/shows"
    shows.fetch
      data:
        partner: partnerId
      success: (shows) ->
        if shows.models?[0]?.get('results')?[0]
          options.success shows.models[0].get('results')[0]
        else
          options.error
      error: options.error
