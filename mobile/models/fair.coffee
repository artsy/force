_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
moment = require 'moment'
dateMixin = require './mixins/date'
setItemsMixin = require './mixins/set_items'
Profile = require '../models/profile'
ShowsFeed = require '../collections/shows_feed'
Partners = require '../collections/partners'
PartnerLocation = require './partner_location'
Artists = require '../collections/artists'
{ Markdown } = require 'artsy-backbone-mixins'
Artworks = require '../collections/artworks'
Relations = require './mixins/relations/fair'
DateHelpers = require '../components/util/date_helpers'

module.exports = class Fair extends Backbone.Model
  _.extend @prototype, Relations
  _.extend @prototype, dateMixin
  _.extend @prototype, setItemsMixin('Fair')
  _.extend @prototype, Markdown

  urlRoot: -> "#{sd.API_URL}/api/v1/fair"

  href: ->
    if @get('default_profile_id')
      "/#{@get('default_profile_id')}"
    else
     "/#{@get('organizer')?.profile_id}"

  initialize: ->
    @showsFeed = new ShowsFeed
    @showsFeed.url = "#{sd.API_URL}/api/v1/fair/#{@get 'id'}/shows"
    @artworks = new Artworks
    @artworks.url = "#{sd.API_URL}/api/v1/search/filtered/fair/#{@get 'id'}"

  imageUrl: (version = 'square') ->
    version = if version in (@get('image_versions') ? [])
                version
              else
                @get('image_versions')?[0]
    @get('image_url')?.replace ':version', version

  location: ->
    new PartnerLocation @get 'location'

  hasOpened: ->
    moment().isAfter @get('start_at')

  formatDates: ->
    DateHelpers.timespanInWords @get('start_at'), @get('end_at')

  formatYear: ->
    moment(@get('start_at')).year()

  small: ->
    @get('layout') is 'small_fair'

  title: ->
    if @small() then @get('organizer').name else @get('name')

  subtitle: ->
    if @small()
      @get('summary')
    else
      "#{@formattedDateRange()} #{@location().cityState()}"

  fetchSections: (options = {}) ->
    new Backbone.Collection().fetch _.extend options,
      url: "#{sd.API_URL}/api/v1/fair/#{@get 'id'}/sections"

  fetchShows: (options = {}) ->
    @showsFeed.fetch _.extend options,
      data: _.extend { size: 3, artworks: true, sort: '-featured' }, options.data

  fetchShowForPartner: (partnerId, options = {}) ->
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

  fetchPartners: (options = {}) ->
    url = "#{sd.API_URL}/api/v1/fair/#{@get 'id'}/partners"
    class PartnerResult extends Backbone.Model
      href: -> "/show/#{@get('partner_show_ids')[0]}"
    partners = new class PartnerResults extends Partners
      model: PartnerResult
      url: url

    partners.fetchUntilEnd _.extend( options,
      data:
        size: 20
        fair_id: @get('id')
        partners: 'partners'
        private_partners: false
    )

  fetchArtists: (options = {}) ->
    url = "#{sd.API_URL}/api/v1/fair/#{@get 'id'}/artists"
    profileId = @get('default_profile_id')
    class ArtistResult extends Backbone.Model
      href: -> "/#{profileId}/browse/artist/#{@get('id')}"
    artists = new class ArtistResults extends Partners
      model: ArtistResult
      url: url

    artists.fetchUntilEnd _.extend(options, data: { size: 20, fair_id: @get('id'), artists: 'artists' })

  fetchFilteredSearchOptions: (options) ->
    filteredSearchOptions = new Backbone.Model
    filteredSearchOptions.url = "#{sd.API_URL}/api/v1/search/filtered/fair/#{@get 'id'}/suggest"
    filteredSearchOptions.fetch options

  fetchOptions: (options = {}) ->
    new Backbone.Model().fetch _.extend options,
      url: "#{sd.API_URL}/api/v1/search/filtered/fair/#{@get 'id'}/options"

  fetchCounts: (options = {}) ->
    new Backbone.Model().fetch _.extend options,
      url: "#{sd.API_URL}/api/v1/search/filtered/fair/#{@get 'id'}/suggest"

  fetchArtworks: (options = {}) ->
    @artworks.fetch options

  isEligible: ->
    @get('published') and
    # Can be undefined which would cause this whole chain to be undefined
    @related().profile.get('published') is true

  isEventuallyEligible: ->
    @get('published') and
    (not @related().profile.get('published'))

  isNotOver: ->
    Date.parse(@get('end_at')) > new Date

  isOver: ->
    Date.parse(@get('end_at')) < new Date

  isCurrent: ->
    @isEligible() and @isNotOver()

  isUpcoming: ->
    @isEventuallyEligible() and @isNotOver()

  isPast: ->
    @isEligible() and @isOver()
