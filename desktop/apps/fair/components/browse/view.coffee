_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
BoothsView = require '../booths/view'
{ setupFilter } = require '../../../../components/filter2/index'
deslugify = require '../../../../components/deslugify/index'
humanize = require('underscore.string').humanize
{ API_URL, SECTION } = require('sharify').data
aggregationParams = require './aggregations'

module.exports = class FairBrowseView extends Backbone.View

  el: '#fair-browse'

  initialize: (options) ->
    _.extend @, options

    @setupBoothView()
    @setupArtworkView()
    @setupArtworkParams()

    @highlightHome()

  setupBoothView: ->
    @boothsView = new BoothsView
      el: $ '.fair-page-content'
      fair: @fair
      profile: @profile
      router: @router
    @boothParams = @boothsView.params
    @boothParams.on 'change reset', @boothsSection
    @boothParams.on 'change reset', @updateBoothPageTitle

  setupArtworkView: ->
    { params } = setupFilter
      el: $ '.fair-page-content'
      stuckParam: { 'fair_id': @fair.id }
      aggregations: aggregationParams
      hideForSaleButton: true
      includeAllWorksButton: true
      startHistory: false
      filterRoot: @fair.href() + '/browse/artworks'

    @artworkParams = params

  setupArtworkParams: ->
    @artworkParams.on 'change reset', @artworksSection
    @artworkParams.on 'change reset', @renderArtworksHeader

  updateBoothPageTitle: =>
    @updatePageTitle(
      if @boothParams.get('section')
        "Exhibitors at #{@boothParams.get('section')}"
      else if @boothParams.get('artist')
        (deslugify @boothParams.get('artist')) + " at "
      else
        "Exhibitors at "
    )

  updatePageTitle: (context) ->
    return unless SECTION is 'browse'
    document.title = _.compact([
      context
      (if @profile.displayName() then "#{@profile.displayName()}" else "Profile")
    ]).join(" ")

  boothsSection: =>
    @$('.filter-artworks-nav .is-active, #fair-filter-all-artists').removeClass('is-active')
    @$el.attr 'data-section', 'booths'

  artworksSection: =>
    @$('#fair-booths-filter-nav .is-active, #fair-filter-all-artists').removeClass('is-active')
    @$el.attr 'data-section', 'artworks'

  renderArtworksHeader: =>
    @$('#fair-browse-artworks-header').text(
      if @artworkParams.get 'related_gene'
        geneName = humanize @artworkParams.get('related_gene')
      else
        ''
    )

  highlightHome: ->
    return unless SECTION is 'browse'
    $('.garamond-tab:eq(1)')
      .removeClass('is-inactive')
      .addClass('is-active')

  events:
    'click #fair-filter-all-artists': 'artistsAZ'
    'click #fair-booths-az-as-list': 'exhibitorsAZ'
    'click #fair-booths-as-grid': 'exhibitorsGrid'
    'click': 'triggerReflow'

  artistsAZ: ->
    @router.navigate "#{@profile.get 'id'}/browse/artists"
    @$('.filter-fixed-header-nav .is-active').removeClass('is-active')
    @$('#fair-filter-all-artists').addClass('is-active')
    @$el.attr 'data-section', 'artists-a-to-z'
    @updatePageTitle 'A-Z List of All Artists'
    false

  exhibitorsAZ: ->
    @router.navigate "#{@profile.get 'id'}/browse/exhibitors"
    @$('.filter-fixed-header-nav .is-active').removeClass('is-active')
    @$('#fair-filter-all-exhibitors').addClass('is-active')
    @$el.attr 'data-section', 'exhibitors-a-to-z'
    @updatePageTitle 'A-Z List of All Exhibitors'
    false

  exhibitorsGrid: ->
    @boothParams.trigger 'reset'
    false

  # Safari does not re-render when a data attribute on an element has changed so we manually trigger a reflow
  triggerReflow: =>
    top = $(window).scrollTop()
    @$el.css display: 'none'
    # no need to store this anywhere, the reference is enough to trigger a reflow
    @$el.offset().height
    @$el.css display: 'block'
    $(window).scrollTop top
