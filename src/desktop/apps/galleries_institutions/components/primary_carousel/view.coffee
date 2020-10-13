_ = require 'underscore'
Backbone = require 'backbone'
{ MAIN_PROFILES } = require('sharify').data
initCarousel = require '../../../../components/merry_go_round/bottom_nav_mgr.coffee'
FollowButtonView = require '../../../../components/follow_button/view.coffee'
template = -> require('./template.jade') arguments...
fetchProfiles = require './fetch.coffee'
facetDefaults = require '../filter_facet/facet_defaults.coffee'
{ ContextModule } = require "@artsy/cohesion"

module.exports = class PrimaryCarousel extends Backbone.View
  events:
    'click .js-gpc-dot': 'dotClicked'
    'click .gpc-carousel [class*="is-selected"]': 'trackClickedBannerImage'
    'click .gpc-overlay': 'trackClickedBanner'
    'click .js-gpc-next': -> @flickity.next()
    'click .js-gpc-prev': -> @flickity.previous()

  initialize: ({ params, @following, @profiles}) ->
    _.each _.pluck(facetDefaults(), 'facetName'), (f) =>
      @listenTo params, "change:#{f}", @fetch
    @listenTo params, 'firstLoad', @setupFlickity
    @listenTo @profiles, 'reset', @render

  fetch: (params) ->
    promise = fetchProfiles(params.toJSON())
    promise.then (profiles) =>
      @profiles.reset profiles.models

  render: ->
    @destroyFlickity()
    @$el.html template profiles: @profiles.models
    @setupFlickity()

  destroyFlickity: ->
    @flickity.off 'cellSelect' if @flickity
    @flickity.destroy() if @flickity

  dotClicked: (e) ->
    i = $(e.toElement).data 'index'
    @flickity.select i

  setupFlickity: =>
    return if not @profiles.length

    autoPlay = @profiles.length > 1
    { cells } = initCarousel @$el, wrapAround: true, autoPlay: autoPlay
    { @flickity } = cells

    $overlays = $('.js-gpc-overlay')
    $overlays.first().fadeIn()

    @flickity.on 'cellSelect', =>
      $dots = @$('.js-gpc-dot')
      $dots.removeClass 'is-active'
      $($dots[@flickity.selectedIndex])
        .addClass 'is-active'

      $overlays.fadeOut()
      $overlays.promise().done =>
        $selected = $($overlays[@flickity.selectedIndex])
        $selected.fadeIn()

    @profiles.map (profile) =>
      new FollowButtonView
        el: @$el.find(".js-follow-button[data-id='#{profile.id}']")
        following: @following
        model: profile
        modelName: 'profile'
        context_page: "Galleries / Institutions page"
        context_module: ContextModule.mainCarousel

  remove: ->
    @destroyFlickity()
    super()

  trackClickedBanner: (e) ->
    $e = $(e.currentTarget)
    partnerSlug = $e
      .find(".gpc-headline")
      .attr("href")
      .split("/")[1]
    showSlug = $e
      .find("[href*='/show']")
      .attr("href")
      .split("/")[2]
    pos = $e.data("idx")
    window.analytics.track("Clicked Galleries Banner", {
      show_slug: showSlug,
      partner_slug: partnerSlug,
      position: pos,
    })

  trackClickedBannerImage: (e) ->
    $e = $(e.currentTarget)
    showSlug = $e
      .find(".gpc-carousel-figure")
      .attr("href")
      .split("/")[2]
    window.analytics.track("Clicked Galleries Banner", {
      show_slug: showSlug,
    })
