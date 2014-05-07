sd                  = require('sharify').data
_                   = require 'underscore'
Backbone            = require 'backbone'
{ Image, Markdown } = require 'artsy-backbone-mixins'
PartnerLocation     = require './partner_location.coffee'
OrderedSets         = require '../collections/ordered_sets.coffee'
Profiles            = require '../collections/profiles.coffee'
DateHelpers         = require '../components/util/date_helpers.coffee'
Clock               = require './mixins/clock.coffee'
moment              = require 'moment'
Profile             = require './profile.coffee'
FilterSuggest       = require './filter_suggest.coffee'

module.exports = class Fair extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Markdown
  _.extend @prototype, Clock

  urlRoot: -> "#{sd.API_URL}/api/v1/fair"

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

  fetchExhibitors: (options) ->
    galleries = new @aToZCollection('show', 'partner')
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
    sections = new Backbone.Collection
    sections.fetch _.extend options,
      cache: true
      url: "#{@url()}/sections"

  fetchPrimarySets: (options) ->
    orderedSets = new OrderedSets
    orderedSets
      .fetchItemsByOwner('Fair', @get('id'), options.cache)
      .done ->
        for set in orderedSets.models
          items = set.get('items').filter (item) ->
            item.get('display_on_desktop')
          set.get('items').reset items
        options.success orderedSets

  # Custom A-to-Z-collection for fair urls
  aToZCollection: (namespace) =>
    href = @href()
    class FairSearchResult extends Backbone.Model
      href: -> "#{href}/browse/#{namespace}/#{@get('id')}"
      displayName: -> @get('name')
      imageUrl: ->
        url = "#{sd.API_URL}/api/v1/profile/#{@get('default_profile_id')}/image"
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
          options.error()
      error: options.error

  itemsToColumns: (items, numberOfColumns=2) ->
    maxRows = Math.floor(items.length / numberOfColumns)
    for i in [0...numberOfColumns]
      items[(i * maxRows)...((i + 1) * maxRows)]

  filteredSearchColumns: (filterdSearchOptions, numberOfColumns=2, key='related_gene', namespace='artworks') ->
    href = @href()
    items = for item in _.keys(filterdSearchOptions.get(key))
      {
        name: item.replace('1', '').split('-').join(' ')
        href: "#{href}/browse/#{namespace}?#{key}=#{item}"
      }
    @itemsToColumns items, numberOfColumns


  # Fetches all of the data necessary to render the initial fair page and returns a
  # giant hash full of those models/az-groups/etc.
  #
  # The hash looks like this:
  #   {
  #     fair: Fair,
  #     profile: Profile
  #     filterSuggest: new FilterSuggest().fetch
  #     filteredSearchOptions: this.filterSuggest
  #     filteredSearchColumns: fair.filteredSearchColumns
  #     sections: fair.fetchSections
  #     galleries: fair.fetchExhibitors
  #     exhibitorsCount: this.galleries.length
  #     exhibitorsAToZGroup: fair.fetchExhibitors
  #     artistsAToZGroup: fair.fetchArtists
  # }
  #
  # @param {Object} options Backbone-like options that calls success with (data)

  fetchOverviewData: (options) ->
    @fetch
      error: options.error
      success: =>

        # Initialize the data hash with the models/collections that can be fetched in parallel
        data =
          fair: this
          profile: new Profile id: @get('organizer').profile_id
          filterSuggest: new FilterSuggest id: "fair/#{@get 'id'}"
          sections: null
          exhibitorsAToZGroup: null
          artistsAToZGroup: null
          galleries: null

        # Setup parallel callback
        after = _.after 5, =>
          options.success _.extend data,
            coverImage: data.profile.coverImage()
            filteredSearchOptions: data.filterSuggest
            filteredSearchColumns: @filteredSearchColumns(
              data.filterSuggest, 2, 'related_gene', 'artworks')
            exhibitorsCount: data.galleries.length

        # Fetch all of the above things in parallel
        data.profile.fetch(error: options.error, success: after)
        data.filterSuggest.fetch(error: options.error, success: after)
        @fetchSections(error: options.error, success: (x) => data.sections = x; after())
        @fetchExhibitors error: options.error, success: (x, y) =>
          data.exhibitorsAToZGroup = x
          data.galleries = y
          after()
        @fetchArtists(error: options.error, success: (x) => data.artistsAToZGroup = x; after())
