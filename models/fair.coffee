sd        = require('sharify').data
_         = require 'underscore'
Backbone  = require 'backbone'
{ Image, Markdown } = require 'artsy-backbone-mixins'
PartnerLocation     = require './partner_location.coffee'
Partners            = require '../collections/partners.coffee'
Artists             = require '../collections/artists.coffee'
OrderedSets         = require '../collections/ordered_sets.coffee'

module.exports = class Fair extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/fair"

  href: ->
    "/#{@get('id')}"

  location: ->
    if @get('location')
      new PartnerLocation @get('location')

  fetchExhibitors: (options) ->
    galleries = new Partners()
    galleries.fetchUntilEnd
      url: "#{@url()}/partners"
      cache: true
      success: ->
        aToZGroup = galleries.groupByAlphaWithColumns 3
        options?.success aToZGroup, galleries
      error: ->
        options?.error()

  fetchArtists: (options) ->
    artists = new Artists([], { models: [] })
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
