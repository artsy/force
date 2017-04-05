_ = require 'lodash'
Backbone = require 'backbone'
FollowProfile = require '../../../../collections/follow_profiles'
FollowButtonView = require '../../../../components/follow_button/view'
CurrentUser = require '../../../../models/current_user'

module.exports = class ArtworkPartnerView extends Backbone.View

  initialize: ({ @artwork }) ->
    @follows = new FollowProfile []
    @setupFollowButton()
    @renderPartnerCities() if @artwork.partner.locations.length > 0
    if @artwork.partner.profile && @artwork.partner.profile.id
      @follows.syncFollows [ @artwork.partner.profile.id ]

  setupFollowButton: ->
    if @artwork.partner.profile && @artwork.partner.profile.id
      new FollowButtonView
        collection: @follows
        el: @$('.apm-follow')
        type: 'Partner'
        followId: @artwork.partner.profile.id
        isLoggedIn: not _.isNull CurrentUser.orNull()
        _id: @artwork.partner.profile._id
        context_module: 'Artwork page'

  renderPartnerCities: ->
    cities = _.uniq _.map(@artwork.partner.locations, ({city}) ->
      city.trim()
    )
    $('.artwork-partner-location').text cities.join(' • ')
