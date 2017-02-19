Backbone = require 'backbone'
sd = require('sharify').data
Artist = require './artist.coffee'

module.exports.FairTrend = class FairTrend extends Backbone.Model

  asTemplateItem: ->
    item = {}
    item.href = @href()
    item.imgSrc = @imageSrc()
    item.labelTitle = @labelTitle()
    item.labelInfo = @labelInfo()
    item


module.exports.FairTrendArtist = class FairTrendArtist extends FairTrend

  artist: ->
    unless @__artist
      @__artist = new Artist @get 'artist'
    @__artist

  href: ->
    "/#{@get('fair_profile_id')}/browse/artist/#{@get('artist').id}"

  imageSrc: ->
    @artist().defaultImageUrl()

  labelTitle: ->
    @get('artist').name

  # Unsopported: The design spec asks for the artist's artwork count for a fair
  # @get('artwork_count')
  labelInfo: ->
    ''


module.exports.FairTrendPartner = class FairTrendPartner extends FairTrend

  href: ->
    return unless @has 'show'
    @get('show').href()

  imageSrc: ->
    if @has('show') and @get('show').hasImageUrl()
      @get('show').imageUrl()
    else
      "#{sd.API_URL}/api/v1/profile/#{@get('partner').default_profile_id}/image?xapp_token=#{sd.ARTSY_XAPP_TOKEN}"

  labelTitle: ->
    @get('partner').name

  labelInfo: ->
    return unless @has 'show'
    @get('show').formattedLocation()
