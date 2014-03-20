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
  shop        : CollectionView
  shows       : ShowsView
  posts       : PostsView
  artists     : ArtistsView
  overview    : OverviewView

module.exports = class PartnerView extends Backbone.View

  events:
    'click .partner-tabs > a'       : 'intercept'
    'click .partner-artists-list a' : 'intercept'

  defaults:
    currentSection: 'overview'

  initialize: (options={}) ->
    { @currentSection } = _.defaults options, @defaults
    @profile = @model # alias
    @partner = new Partner @profile.get('owner')
    @listenTo @partner, 'sync', @initializeTablist
    @initializeCache()
    @initializePartner()
    @initializeFollows()

  renderSection: (section, extraParams={}) ->
    @highlightTab (@currentSection = section)

    $(window).off '.partner' # reset events under .partner namespace
    new sectionToView[@currentSection]?( _.extend(
      el      : @$('.partner-content')
      profile : @profile
      partner : @partner
      cache   : @cache[@currentSection]
    , extraParams))

  intercept: (e) ->
    e.preventDefault()

    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true

  #
  # cache is a dictionary of section_name: data pair. We simply pass the data
  # to the view of each section and each view can manage the data as necessary.
  #
  initializeCache: ->
    @cache = {}; _.each sectionToView, (v, k) => @cache[k] = {}

  initializePartner: -> @partner.fetch cache: true

  initializeTablist: ->
    @sections = @getDisplayableSections @getSections()

    # If the partner doesn't have its default tab displayable,
    # e.g. /overview for galleries or /shows for institutions,
    # we display the first tab content of displayable tabs.
    unless _.contains @sections, @currentSection
      @renderSection (@currentSection = @sections?[0])

    # Render tablist
    @$('.partner-nav').html( tablistTemplate
      profile: @profile
      sections: @sections
      currentSection: @currentSection
    )

  initializeFollows: ->
    @following = new Following(null, kind: 'profile') if sd.CURRENT_USER?

    @followButtons = new FollowButton
      el: @$(".partner-actions .follow-button")
      following: @following
      modelName: 'partner'
      model: @model
      analyticsFollowMessage: 'Followed partner profile from /partner'
      analyticsUnfollowMessage: 'Unfollowed partner profile from /partner'

    @following?.syncFollows [@profile.get('id')]

  highlightTab: (section) ->
    $tabs = @$('.partner-tabs a[data-section]')

    $tabs.removeClass('is-active').addClass('is-inactive')
    $tabs.filter("[data-section='#{section}']").addClass('is-active')

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
