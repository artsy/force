Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data

module.exports = class Artwork extends Backbone.Model

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/artwork"

  defaultImageUrl: (version = 'medium') ->
    @get('images')?[0]?.image_url.replace(':version', version) ? ''

  isSaved: (artworkCollection) ->
    artworkCollection && artworkCollection.isSaved(@)

  titleAndYear: ->
    _.compact([
      if @get('title')? and @get('title').length > 0 then "<em>#{@get('title')}</em>" else null,
      @get('date')
    ]).join(", ")

  hasWebsite: ->
    !!@get('website')

  hasCollectingInstitution: ->
    @get('collecting_institution')?.length > 0

  partnerName: ->
    if @hasCollectingInstitution()
      @get('collecting_institution')
    else if @get('partner')?
      @get('partner').name
    else
      ""

  partnerLink: ->
    partner = @get('partner')
    return unless partner
    if partner.default_profile_public && partner.default_profile_id
      return "/#{partner.default_profile_id}"
    if partner.website?.length > 0
      return partner.website

  partnerLinkTarget: ->
    linkType = @get('partner').linkType()
    if linkType == "external" then "_blank" else "_self"

  artistLink: -> "/artist/#{@get('artist').id}"
