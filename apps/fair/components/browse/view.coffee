_ = require 'underscore'
Backbone = require 'backbone'
BoothsView = require '../booths/view.coffee'
FilterArtworksView = require '../../../../components/filter/artworks/view.coffee'
{ ARTSY_URL, SECTION } = require('sharify').data

module.exports = class FairBrowseView extends Backbone.View

  el: '#fair-browse'

  initialize: (options) ->
    _.extend @, options
    @filterArtworksView = new FilterArtworksView
      el: $ '.fair-page-content'
      artworksUrl : "#{ARTSY_URL}/api/v1/search/filtered/fair/#{@fair.get 'id'}"
      countsUrl: "#{ARTSY_URL}/api/v1/search/filtered/fair/#{@fair.get 'id'}/suggest"
      urlRoot: "#{@profile.id}/browse"
    @artworkParams = @filterArtworksView.params
    @counts = @filterArtworksView.counts
    @boothsView = new BoothsView
      el: $ '.fair-page-content'
      fair: @fair
      profile: @profile
      router: @router
    @boothParams = @boothsView.params
    @boothParams.on 'change reset', @boothsSection
    @artworkParams.on 'change reset', @artworksSection
    @counts.fetch()
    @highlightHome()

  boothsSection: =>
    @$('.filter-artworks-nav .is-active, #fair-filter-all-artists').removeClass('is-active')
    @$el.attr 'data-section', 'booths'

  artworksSection: =>
    @$('#fair-booths-filter-nav .is-active, #fair-filter-all-artists').removeClass('is-active')
    @$el.attr 'data-section', 'artworks'

  highlightHome: ->
    return unless SECTION is 'browse'
    $('.garamond-tab:eq(1)')
      .removeClass('is-inactive')
      .addClass('is-active')

  events:
    'click #fair-filter-all-artists': 'artistsAZ'
    'click #fair-booths-az-as-list': 'exhibitorsAZ'

  artistsAZ: ->
    @router.navigate "#{@profile.get 'id'}/browse/artists"
    @$('.filter-fixed-header-nav .is-active').removeClass('is-active')
    @$('#fair-filter-all-artists').addClass('is-active')
    @$el.attr 'data-section', 'artists-a-to-z'

  exhibitorsAZ: ->
    @router.navigate "#{@profile.get 'id'}/browse/exhibitors"
    @$('.filter-fixed-header-nav .is-active').removeClass('is-active')
    @$('#fair-filter-all-exhibitors').addClass('is-active')
    @$el.attr 'data-section', 'exhibitors-a-to-z'