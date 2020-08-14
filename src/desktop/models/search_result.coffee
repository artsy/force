_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
moment = require 'moment-timezone'
Backbone = require 'backbone'
{ Image } = require '@artsy/backbone-mixins'
PartnerShow = require './partner_show.coffee'

module.exports = class SearchResult extends Backbone.Model
  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)

  initialize: (options) ->

    @set
      slug: @get('id')
      id: @get('_id')

    @set
      display: @display()
      image_url: @imageUrl()
      display_model: @displayModel()
      location: @location()
      status: @status()

    @set
      about: @about()

    # Set value attribute for autocomplete usage
    @value = @display()

  display: ->
    _s.trim(@get('name') || @get('owner')?.name || @get('display'))

  trimmedDisplay: ->
    _s.trim(_s.truncate(@get('display'), 75))

  location: ->
    if @get('href')
      @get('href')
    else if @get('model') is 'profile' || @get('model') is 'page'
      "/#{@get('slug')}"
    else if @get('model') is 'fair'
      "/#{@get('profile_id')}"
    else if @get('model') is 'partnershow'
      "/show/#{@get('slug')}"
    else if @get('model') is 'sale'
      "/auction/#{@get('slug')}"
    else if @get('model') is 'city'
      "/shows/#{@get('slug')}"
    else
      "/#{@get('model')}/#{@get('slug')}"

  displayModel: ->
    originalModel = @get('model')
    model = switch originalModel
      when 'gene'
        'category'
      when 'partnershow'
        'show'
      when 'profile'
        institutionTypes = ['PartnerInstitution', 'PartnerInstitutionalSeller']
        if @get('owner_type') in institutionTypes
          'institution'
        else if @get('owner_type') == 'FairOrganizer'
          'fair'
        else
          'gallery'
      else
        originalModel

    _s.capitalize model

  imageUrl: ->
    return "/images/icon-70.png" if @get('display_model') in ['Page', 'City'] # internal pages
    @get('image_url')

  resultsPageTitle: ->
    if @get('display_model') == 'Artist'
      @get('display') + " - View & Collect Works"
    else
      @get('display')

  updateForFair: (fair) ->
    if @get('display_model') == 'Show'
      @set display_model: 'Booth'
    else
      @set location: "#{fair.href()}/browse#{@get('location')}"

  about: ->
    if @get('display_model') == 'Article'
      @formatArticleAbout()
    else if @get('display_model') == 'Fair'
      @formatEventAbout('Art fair')
    else if @get('display_model') == 'Sale'
      @formatEventAbout('Sale', "America/New_York")
    else if @get('display_model') in ['Show', 'Booth']
      @formatShowAbout()
    else if @get('display_model') in ['Artwork', 'Feature', 'Gallery', 'Page']
      @get('description')
    else if @get('display_model') == 'City'
      @formatCityAbout()
    else undefined

  status: ->
    if @get('model') == 'partnershow'
      if startTime = @get('start_at')
        if endTime = @get('end_at')
          if moment() > moment(endTime)
            'closed'
          else if moment() > moment(startTime)
            'running'
          else
            'upcoming'

  formatCityAbout: ->
    "Browse current exhibitions in #{@get('display')}"

  formatArticleAbout: ->
    if publishedTime = @get('published_at')
      formattedPublishedTime = moment(publishedTime).format("MMM Do, YYYY")

    excerpt = @get('description')

    if publishedTime and excerpt
      "#{formattedPublishedTime} ... #{excerpt}"
    else if publishedTime
      formattedPublishedTime
    else
      excerpt

  formatShowAbout: ->
    if @get('artist_names')
      artists = { name: artist } for artist in @get('artist_names')
    else
      artists = []

    show = new PartnerShow
      name: @get('display')
      start_at: @get('start_at')
      end_at: @get('end_at')
      status: @get('status')
      location:
        city: @get('city')
        address: @get('address')
      artists:
        artists

    if @get('fair_id')
      show.set fair: { name: @get('venue') }
    else
      show.set partner: { name: @get('venue') }

    show.toPageDescription()

  formatEventAbout: (title, timezone) ->
    formattedStartTime = @formatEventTime(@get('start_at'), 'MMM Do', timezone)
    formattedEndTime = @formatEventTime(@get('end_at'), 'MMM Do, YYYY', timezone)
    location = @get('city')

    if formattedStartTime and formattedEndTime
      about = "#{title} running from #{formattedStartTime} to #{formattedEndTime}"
      about += " in #{location}" if location
    else if formattedStartTime
      about = "#{title} opening #{formattedStartTime}"
      about += " in #{location}" if location
    else
      about = @get('description')

    about

  formatEventTime: (timestamp, format, timezone) ->
    if timestamp
      momentTime = moment(timestamp)

      if !momentTime.isValid()
        null
      else if timezone
        momentTime = momentTime.tz(timezone)
        "#{momentTime.format(format)} (at #{momentTime.format("h:mma z")})"
      else
        momentTime.format(format)

  href: ->
    @get('location')
