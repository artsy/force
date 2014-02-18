_ = require 'underscore'
Backbone = require 'backbone'
BoothsView = require './booths.coffee'
ArtistView = require './artist.coffee'
ArtworksView = require './artworks.coffee'
qs = require 'querystring'
FilterArtworksView = require '../../../components/filter/artworks/view.coffee'
FeedView = require '../../../components/feed/client/feed.coffee'
{ ARTSY_URL } = require('sharify').data
fairSectionsTemplate = -> require('../templates/fair_sections.jade') arguments...

class FilterHeader extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @fair.fetchSections success: @renderSections

  renderSections: (sections) =>
    hash = {}
    sections.each (section) -> hash[section.get 'section'] = section.get('section')
    @$('#fair-filter-sections').html fairSectionsTemplate(sections: hash)

  removeActive: ->
    @$('.is-active').removeClass("is-active")

  events:
    'click #fair-filter-all-exhibitors': 'allExhibitors'
    'click #fair-filter-all-artists': 'allArtists'
    'click #fair-filter-sections nav a': 'boothsSection'

  allExhibitors: ->
    @router.navigate "#{@profile.get 'id'}/browse/booths", trigger: true
    @$('#fair-filter-all-exhibitors').addClass("is-active")

  allArtists: ->
    @router.navigate "#{@profile.get 'id'}/browse/artists", trigger: true
    @$('#fair-filter-all-artists').addClass("is-active")

  boothsSection: (e) ->
    @router.navigate "#{@profile.get 'id'}/browse/booths/section/#{$(e.currentTarget).data 'val'}", trigger: true
    @$('#fair-filter-sections .filter-dropdown')
      .addClass("is-active").find('.filter-nav-active-text').text $(e.currentTarget).text()

module.exports = class BrowseRouter extends Backbone.Router

  routes:
    ':id/browse/artists'                   : 'artists'
    ':id/browse/artworks'                  : 'artworks'
    ':id/browse/artist/:artist_id'         : 'artist'
    ':id/browse/booths'                    : 'booths'
    ':id/browse/booths/region/:region'     : 'boothsRegion'
    ':id/browse/booths/section/:section'   : 'boothsSection'
    ':id/browse/category/:category'        : 'category'
    ':id/browse/exhibitors'                : 'exhibitors'
    ':id/browse'                           : 'browse'

  initialize: (options) ->
    _.extend @, options
    $('.garamond-tab:first').removeClass('is-inactive').addClass('is-active')
    @filterArtworks = new FilterArtworksView
      el: $ '.fair-page-content'
      artworksUrl : "#{ARTSY_URL}/api/v1/search/filtered/fair/#{@fair.get 'id'}"
      countsUrl: "#{ARTSY_URL}/api/v1/search/filtered/fair/#{@fair.get 'id'}/suggest"
    @filterHeader = new FilterHeader
      el: '#fair-filter'
      fair: @fair
      profile: @profile
      router: @
    @filterArtworks.params.on 'change', @navigateArtworkParams
    Backbone.history.start pushState: true

  route: (route, name, callback) =>
    Backbone.Router::route.call @, route, name, =>
      $('.browse-section').hide()
      (callback or @[name])? arguments...

  navigateArtworkParams: (m, params) =>
    @navigate "#{@profile.get 'id'}/browse/artworks?" + qs.stringify(params), trigger: true

  artist: (id, artistId)=>
    @artistView ?= new ArtistView
      el: $('.browse-section.artist')
      fair: @fair
      artistId: artistId
    @artistView.$el.show()

  booths: (id, params={})=>
    @boothsView ?= new BoothsView
      el: $('.browse-section.booths')
      fair: @fair
      filter: params
      profile: @profile
    @boothsView.filter = params
    @boothsView.fetchFeedItems()
    @boothsView.renderHeader()
    @boothsView.$el.show()
    @boothsView?.$('.feed').hide()
    $(document).one 'ajaxStop', => @boothsView.$('.feed').show()

  artworks: (id, params={})=>
    @artworksView ?= new ArtworksView
      el: $('.browse-section.artworks')
      fair: @fair
      filter: params
    @artworksView.$el.show()

  category: (id, category)=>
    @artworks id, category: category

  boothsSection: (id, section)=>
    @booths id, section: section

  boothsRegion: (id, region)=>
    @booths id, partner_region: region

  exhibitors: =>
    $('.browse-section').hide()
    $('.exhibitors-a-to-z').show()

  artists: =>
    $('.browse-section').hide()
    $('.artists-a-to-z').show()

  browse: (id) =>
    @navigate "#{id}/browse/booths", trigger: true