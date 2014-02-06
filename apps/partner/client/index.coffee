_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
CurrentUser   = require '../../../models/current_user.coffee'
Partner       = require '../../../models/partner.coffee'
Profile       = require '../../../models/profile.coffee'
ContactView   = require './contact.coffee'
tablistTemplate = -> require('../templates/tablist.jade') arguments...

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

sectionToView =
  contact: ContactView

module.exports.PartnerView = class PartnerView extends Backbone.View

  defaults:
    sections: []
    currentSection: 'overview'

  initialize: (options={}) ->
    { @sections, @currentSection } = _.defaults options, @defaults
    @profile = @model # alias
    @partner = new Partner @profile.get('owner')
    @initTabs()
    @initContent()
    @following = new Following(null, kind: 'profile') if sd.CURRENT_USER?
    @initFollowButton()
    @following?.syncFollows [@profile.get('id')]

  initTabs: ->
    @partner?.fetch
      cache: true
      success: =>
        sections = @getDisplaySections @getSections()
        @$('.partner-nav').html(
          $( tablistTemplate profile: @profile, sections: sections, sd: sd )
        )

  initContent: ->
    new sectionToView[@currentSection]?(
      el: @$('.partner-content')
      profile: @profile
      partner: @partner
    )

  initFollowButton: ->
    @followButtons = new FollowButton
      analyticsFollowMessage: 'Followed partner profile from /partner'
      analyticsUnfollowMessage: 'Unfollowed partner profile from /partner'
      el: @$(".partner-actions .follow-button")
      following: @following
      model: @model

  getSections: ->
    # The order in the array will be used for presentation
    gallery     = ['overview', 'shows', 'artists', 'posts', 'contact']
    institution = ['shows', 'collection', 'posts', 'shop', 'about']

    if @profile.isGallery() then gallery
    else if @profile.isInstitution() then institution
    else []
    
  getDisplaySections: (sections) ->
    criteria =
      overview:   => true
      shows:      => @partner.get('displayable_shows_count') > 0
      artists:    => @partner.get('partner_artists_count') > 0
      collection: => @partner.get('published_not_for_sale_artworks_count') > 0
      contact:    => true
      about:      => true
      posts:      => @partner.get('has_full_profile') and @profile.hasPosts()
      shop:       => @partner.get('published_for_sale_artworks_count') > 0

    _.filter sections, (s) -> criteria[s]?()

module.exports.init = ->
  new PartnerView
    model: new Profile sd.PROFILE
    el: $('#partner')
    currentSection: sd.SECTION
