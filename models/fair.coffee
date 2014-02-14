sd                  = require('sharify').data
_                   = require 'underscore'
Backbone            = require 'backbone'
{ Image, Markdown } = require 'artsy-backbone-mixins'
PartnerLocation     = require './partner_location.coffee'
OrderedSets         = require '../collections/ordered_sets.coffee'
Profiles            = require '../collections/profiles.coffee'
DateHelpers         = require '../components/util/date_helpers.coffee'

module.exports = class Fair extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/fair"

  href: ->
    "/#{@get('organizer')?.profile_id}"

  hasImage: (version = 'wide') ->
    version in (@get('image_versions') || [])

  location: ->
    if @get('location')
      new PartnerLocation @get('location')

  formatLocation: ->
    @location()?.get('city')

  formatDates: ->
    DateHelpers.timespanInWords @get('start_at'), @get('end_at')

  formatStartTime: ->
    moment(@get('start_at')).fromNow()

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

  fetchFilteredSearchOptions: (options) ->
    filteredSearchOptions = new Backbone.Model
    filteredSearchOptions.url = "#{sd.ARTSY_URL}/api/v1/search/filtered/fair/#{@get('id')}/suggest"
    filteredSearchOptions.fetch options

  itemsToColumns: (items, numberOfColumns=2) ->
    maxRows = Math.floor(items.length / numberOfColumns)
    for i in [0...numberOfColumns]
      items[(i * maxRows)...((i + 1) * maxRows)]

  filteredSearchColumns: (filterdSearchOptions, numberOfColumns=2, key='related_gene', namespace='category') ->
    href = @href()
    items = for item in _.keys(filterdSearchOptions.get(key))
      {
        name: item.replace('1', '').split('-').join(' ')
        href: "#{href}/browse/#{namespace}/#{item}"
      }
    @itemsToColumns items, numberOfColumns

  getItemsForKey: (key) ->
