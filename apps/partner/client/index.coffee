_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'
CurrentUser     = require '../../../models/current_user.coffee'
Partner         = require '../../../models/partner.coffee'
Profile         = require '../../../models/profile.coffee'
ContactView     = require './contact.coffee'
CollectionView  = require './collection.coffee'
ShowsView       = require './shows.coffee'
PostsView       = require './posts.coffee'
ArtistsView     = require './artists.coffee'
OverviewView    = require './overview.coffee'
tablistTemplate = -> require('../templates/tablist.jade') arguments...

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

sectionToView =
  contact     : ContactView
  about       : ContactView
  collection  : CollectionView
  shows       : ShowsView
  posts       : PostsView
  artists     : ArtistsView
  overview    : OverviewView

module.exports.PartnerView = class PartnerView extends Backbone.View

  defaults:
    currentSection: 'overview'

  initialize: (options={}) ->
    { @currentSection } = _.defaults options, @defaults
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
        sections = @getDisplayableSections @getSections()

        # If the partner doesn't have its default tab displayable,
        # e.g. `Overview` for galleries or `Shows` for institutions,
        # we display the first tab content of displayable tabs.
        if not _.contains sections, @currentSection
          @currentSection = sections?[0]; @initContent()

        @$('.partner-nav').html( tablistTemplate
          profile: @profile
          sections: sections
          currentSection: @currentSection
        )

  initContent: ->
    new sectionToView[@currentSection]?(
      el: @$('.partner-content')
      profile: @profile
      partner: @partner
      artistId: sd.ARTIST_ID
    )

  initFollowButton: ->
    @followButtons = new FollowButton
      analyticsFollowMessage: 'Followed partner profile from /partner'
      analyticsUnfollowMessage: 'Unfollowed partner profile from /partner'
      el: @$(".partner-actions .follow-button")
      following: @following
      modelName: 'partner'
      model: @model

  #
  # Get an ordered list of sections available to a gallery or institution.
  #
  getSections: ->
    # The order in the array will be used for presentation
    gallery     = ['overview', 'shows', 'artists', 'posts', 'contact']
    institution = ['shows', 'collection', 'posts', 'shop', 'about']

    if @profile.isGallery() then gallery
    else if @profile.isInstitution() then institution
    else []

  #
  # Filter and return displayable sections of a gallery or institution.
  #
  # @param {Object} sections An array of sections to be filtered.
  getDisplayableSections: (sections) ->
    criteria =
      overview:   => true
      shows:      => @partner.get('displayable_shows_count') > 0
      artists:    => @partner.get('partner_artists_count') > 0
      collection: => @partner.get('published_not_for_sale_artworks_count') > 0
      contact:    => true
      about:      => true
      posts:      => @profile.hasPosts()
      shop:       => @partner.get('published_for_sale_artworks_count') > 0

    _.filter sections, (s) -> criteria[s]?()

module.exports.init = ->
  new PartnerView
    model: new Profile sd.PROFILE
    el: $('#partner')
    currentSection: sd.SECTION
