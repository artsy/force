sd                  = require('sharify').data
_                   = require 'underscore'
Backbone            = require 'backbone'
{ Image, Markdown } = require 'artsy-backbone-mixins'
PartnerLocation     = require './partner_location.coffee'
OrderedSets         = require '../collections/ordered_sets.coffee'
Profiles            = require '../collections/profiles.coffee'
DateHelpers         = require '../components/util/date_helpers.coffee'
Clock               = require './mixins/clock.coffee'

module.exports = class Fair extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown
  _.extend @prototype, Clock

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
    galleries = new @aToZCollection('show', 'partner')
    galleries.fetchUntilEnd
      url: "#{@url()}/partners"
      cache: true
      success: ->
        exhibitorsColumns = galleries.groupByColumns 3
        aToZGroup = galleries.groupByAlphaWithColumns 3
        options?.success aToZGroup, exhibitorsColumns, galleries
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
      imageUrl: ->
        url = "#{sd.ARTSY_URL}/api/v1/profile/#{@get('default_profile_id')}/image"
        url = url + "?xapp_token=#{sd.ARTSY_XAPP_TOKEN}" if sd.ARTSY_XAPP_TOKEN?
        url
    new class FairSearchResults extends Profiles
      model: FairSearchResult
      # comparator: (model) -> model.get('sortable_id')
      groupByColumns: (columnCount=3) ->
        itemsPerColumn = Math.ceil(@length/3)
        columns = []
        for n in [0...columnCount]
          columns.push @models[n*itemsPerColumn..(n+1)*itemsPerColumn - 1]
        columns

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
