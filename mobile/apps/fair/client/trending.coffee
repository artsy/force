_ = require 'underscore'
bootstrap = require '../../../components/layout/bootstrap'
Backbone = require 'backbone'
sd = require('sharify').data
Fair = require '../../../models/fair'
Profile = require '../../../models/profile'
Show = require '../../../models/show'
ShowsFeed = require '../../../collections/shows_feed'
{ FairTrendArtist, FairTrendPartner } = require '../../../models/fair_trend'
imageNavItemTemplate = -> require('../templates/image_nav_item.jade') arguments...

module.exports.TrendingView = class TrendingView extends Backbone.View

  initialize: (options) ->
    { @fair, @profile } = options
    @initTrendingArtists()
    @initTrendingExhibitors()
    @initTopFollowedExhibtors()

  initTrendingArtists: ->
    @$trendingArtists = @$ '.fair-trending-artists .fair-trending-items'
    @trendingArtists = new Backbone.Collection [], model: FairTrendArtist
    @trendingArtists.parse = (res) =>
      for item in res
        item.fair_profile_id = @profile.get 'id'
      res
    @listenTo @trendingArtists, 'sync', => @renderTrendingItems @$trendingArtists, @trendingArtists
    @trendingArtists.fetch
      url: "#{@fair.url()}/trending/artists"
      data: { size: 5 }

  initTrendingExhibitors: ->
    @$trendingExhibitors = @$ '.fair-trending-exhibitors .fair-trending-items'
    @trendingExhibitors = new Backbone.Collection [], { model: FairTrendPartner }
    @listenTo @trendingExhibitors, 'sync', @fetchExhibitorShows
    @listenTo @trendingExhibitors, 'renderReady', => @renderTrendingItems @$trendingExhibitors, @trendingExhibitors
    @trendingExhibitors.fetch
      url: "#{@fair.url()}/trending/partners"
      data: { size: 5 }

  initTopFollowedExhibtors: ->
    @$topFollowedExhibitors = @$ '.fair-trending-followed-exhibitors .fair-trending-items'
    @topFollowedExhibitors = new Backbone.Collection [], { model: FairTrendPartner }
    @listenTo @topFollowedExhibitors, 'sync', @fetchExhibitorShows
    @listenTo @topFollowedExhibitors, 'renderReady', => @renderTrendingItems @$topFollowedExhibitors, @topFollowedExhibitors
    @topFollowedExhibitors.fetch
      url: "#{@fair.url()}/partners/follows"
      data: { size: 5 }

  # Kill this if it takes too long.
  # We need shows for the link and the booth location
  fetchExhibitorShows: (collection) ->
    done = _.after collection.length, -> collection.trigger 'renderReady'
    for trendingPartner in collection.models
      new ShowsFeed([], { model: Show }).fetch
        url: "#{@fair.url()}/shows"
        data:
          size: 5
          partner: trendingPartner.get('partner').id
          private_partner: false
        success: (shows) ->
          # We assume a partner only has one booth at a fair
          show = shows.first()
          trendingPartner = collection.find (tp) -> tp.get('partner').id is show.get('partner').id
          trendingPartner.set 'show', shows.first()
          done()

  renderTrendingItems: ($container, collection) ->
    items = collection.models
    html = []
    for item, position in items
      formattedItem = item.asTemplateItem()
      formattedItem.position = position + 1
      html.push imageNavItemTemplate formattedItem
    $container.html html.join ''
    $container.show()

module.exports.init = ->
  bootstrap()
  fair = new Fair sd.FAIR
  profile = new Profile sd.PROFILE
  new TrendingView
    el: $ '#fair-trending'
    fair: fair
    profile: profile
