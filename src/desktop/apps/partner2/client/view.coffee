_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
Partner = require '../../../models/partner.coffee'
Profile = require '../../../models/profile.coffee'
Articles = require '../../../collections/articles.coffee'
ShowsView = require './shows.coffee'
OverviewView = require './overview.coffee'
FilteredArtworks = require './artworks_filter.coffee'
ArtistsView = require './artists.coffee'
ArticlesView = require './articles.coffee'
ContactView = require './contact.coffee'
tablistTemplate = -> require('../templates/tablist.jade') arguments...
mediator = require '../../../lib/mediator.coffee'
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'
require '../../../../lib/promiseDone'
{ ContextModule } = require "@artsy/cohesion"

sectionToView =
  overview: OverviewView
  shows: ShowsView
  works: FilteredArtworks
  collection: FilteredArtworks
  shop: FilteredArtworks
  artists: ArtistsView
  articles: ArticlesView
  contact: ContactView
  about: ContactView

module.exports = class PartnerView extends Backbone.View

  events:
    # Links that uses router should have a partner-route-link class
    'click .partner2-route-link': 'intercept'

  defaults:
    currentSection: 'overview'

  initialize: (options={}) ->
    @currentUser = CurrentUser.orNull()
    { @currentSection, @partner, @profile } = _.defaults options, @defaults
    @initializeCache()
    @initializePartnerAndCounts().then(@initializeTablistAndContent).done()
    @initializePartnerLocations()
    @initializeFollows()

  renderSection: (section, @sectionViewParams = {}) ->
    @highlightTab (@currentSection = section)
    $(window).off '.partner' # reset events under .partner namespace

    # For tabs requiring the partner to be fetched (currently only the
    # overview), delay the content initialization after @partner is synced.
    # Otherwise, we can just go ahead and render the content.
    return unless @isPartnerFetched or @currentSection isnt 'overview'
    new sectionToView[@currentSection]?( _.extend(
      el: @$('.partner2-content')
      profile: @profile
      partner: @partner
      cache: @cache[@currentSection]
    , @sectionViewParams))

  intercept: (e) ->
    e.preventDefault()

    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true

  #
  # cache is a dictionary of section_name: data pair. We simply pass the data
  # to the view of each section and each view can manage the data as necessary.
  #
  initializeCache: ->
    @cache = {}; _.each sectionToView, (v, k) => @cache[k] = {}

  initializePartnerAndCounts: ->
    articles = new Articles
    articlesFetchData =
      partner_id: @partner.get('_id')
      published: true
      limit: 1
      count: true

    Promise.allSettled([@partner.fetch(), articles.fetch(data: articlesFetchData)])
      .then => @partnerArticlesCount = articles.count

  initializePartnerLocations: ->
    @partner.related().locations.fetch
      success: (locations) =>
        @$('.partner2-header .partner2-locations').html locations.displayCities(' • ')

  initializeTablistAndContent: =>
    @isPartnerFetched = true
    @sections = @getDisplayableSections @getSections()

    # Render tablist
    @$('.partner2-nav').html( tablistTemplate
      profile: @profile
      sections: @sections
      currentSection: @currentSection
    )

    # If the tab isn't displayable, display the first tab content
    # of displayable tabs.
    if not _.contains @sections, @currentSection
      mediator.trigger 'change:route', @sections?[0]

    # Only render content for centain tabs
    else if @currentSection is 'overview'
      @renderSection @currentSection, @sectionViewParams

  initializeFollows: ->
    @following = new Following(null, kind: 'profile') if sd.CURRENT_USER?

    @followButtons = new FollowButton
      el: @$(".partner2-actions .follow-button")
      following: @following
      modelName: 'partner'
      model: @profile
      context_page: "Partner profile page"
      context_module: ContextModule.partnerHeader

    @following?.syncFollows [@profile.get('id')]

  highlightTab: (section) ->
    $tabs = @$('.partner2-tabs a[data-section]')

    $tabs.removeClass('is-active').addClass('is-inactive')
    $tabs.filter("[data-section='#{section}']").addClass('is-active')

  #
  # Get an ordered list of sections applicable to a partner.
  #
  getSections: ->
    gallery          = ['overview', 'shows', 'works', 'artists', 'articles', 'contact']
    institution      = ['overview', 'shows', 'collection', 'articles', 'artists', 'shop', 'about']
    unclaimedGallery = ['overview']

    if @profile.isInstitution()
      institution
    else if @profile.isGallery() and @partner.get('claimed')
      gallery
    else if @profile.isGallery()
      unclaimedGallery
    else
      []

  #
  # Filter and return displayable sections of a gallery or institution.
  #
  # @param {Object} sections An array of sections to be filtered.
  getDisplayableSections: (sections) ->
    criteria =
      overview: => true
      shows: => @partner.get('displayable_shows_count') > 0
      artists: => @partner.get('partner_artists_count') > 0 and @partner.get('display_artists_section')
      works: => (@partner.get('published_not_for_sale_artworks_count') > 0 or @partner.get('published_for_sale_artworks_count')) > 0 and @partner.get('display_works_section')
      collection: => @partner.get('published_not_for_sale_artworks_count') > 0 and @partner.get('display_works_section')
      contact: => true
      about: => true
      articles: => @partnerArticlesCount > 0
      shop: => @partner.get('published_for_sale_artworks_count') > 0

    _.filter sections, (s) -> criteria[s]?()
