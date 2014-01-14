_               = require 'underscore'
moment          = require 'moment'
sd              = require('sharify').data
Artworks        = require '../collections/artworks.coffee'
AdditionalImage = require './additional_image.coffee'
Backbone        = require 'backbone'
Fair            = require './fair.coffee'
FairLocation    = require './fair_location.coffee'
Partner         = require './partner.coffee'
PartnerLocation = require './partner_location.coffee'
DateHelpers     = require '../components/util/date_helpers.coffee'
ImageMixin      = require './mixins/image.coffee'

module.exports = class PartnerShow extends Backbone.Model

  _.extend @prototype, ImageMixin

  url: ->
    if @has('partner')
      "#{sd.ARTSY_URL}/api/v1/partner/#{@get('partner').id}/show/#{@get('id')}"
    else
      "#{sd.ARTSY_URL}/api/v1/show/#{@get('id')}"

  metaImage: ->
    if @has 'image_url' and @get 'image_versions' and @hasImage 'large'
      @imageUrl 'large'
    else if @artworks?.length > 0 and @artworks.first().hasImage 'large'
      @artworks.first().imageUrl 'large'
    else
      null

  metaTitle: ->
    _.compact([
      @get 'name' || ''
      @get('partner')?.name || ''
      @get('fair')?.name || ''
      @location()?.singleLine() || ''
      @runningDates() || ''
    ]).join ' | '

  title: ->
    @get 'name'

  shareTitle: ->
    if @has('fair_location')
      return "#{@get('name')}, #{@get('fair_location').name} See it on @artsy"
    "See \"#{@get('name')}\" at #{@get('partner').name} on @artsy"

  href: ->
    if @has('fair') and @get('fair').organizer
      "#{sd.ARTSY_URL}/#{@get('fair').organizer.profile_id}/browse/show/#{@get('partner').id}"
    else
      "#{sd.ARTSY_URL}/show/#{@get('id')}"

  runningDates: ->
    DateHelpers.timespanInWords @get('start_at'), @get('end_at')

  fetchInstallShots: (callbacks) ->
    throw "You must pass a success callback" unless callbacks?.success? and _.isFunction(callbacks.success)
    @installShots = new Backbone.Collection [], { model: AdditionalImage }
    options =
      data   : { default: false }
      url    : "#{sd.ARTSY_URL}/api/v1/partner_show/#{@get('id')}/images"
      cache  : true
    _.extend options, callbacks
    @installShots.fetch options

  fetchArtworks: (callbacks) ->
    throw "You must pass a success callback" unless callbacks?.success? and _.isFunction(callbacks.success)
    @artworks = new Artworks []
    options =
      data   : { size: 10, published: true }
      url    : "#{@url()}/artworks"
      cache  : true
    _.extend options, callbacks
    @artworks.fetchUntilEnd options

  #
  # Related model generators... factories... ?
  #
  fair: ->
    if @has 'fair'
      new Fair @get 'fair'
    else
      null

  location: ->
    if @has 'location'
      new PartnerLocation @get 'location'
    else if @has 'fair_location'
      new FairLocation @get 'fair_location'
    else
      null

  partner: ->
    if @has 'partner'
      new Partner @get 'partner'
    else
      null
