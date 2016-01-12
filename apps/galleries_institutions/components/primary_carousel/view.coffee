_ = require 'underscore'
Backbone = require 'backbone'
{ MAIN_PROFILES } = require('sharify').data
initCarousel = require '../../../../components/merry_go_round/index.coffee'
FollowButtonView = require '../../../../components/follow_button/view.coffee'
template = -> require('./template.jade') arguments...
fetchProfiles = require './fetch.coffee'

module.exports = class PrimaryCarousel extends Backbone.View

  initialize: ({ params, @following, @profiles}) ->
    @listenTo params, 'change:location change:category', @fetch
    @listenTo params, 'firstLoad', @setupFlickity
    @listenTo @profiles, 'reset', @render

  fetch: (params) ->
    promise = fetchProfiles(params.toJSON())
    promise.then (profiles) =>
      @profiles.reset profiles.models

  render: ->
    @$el.html template profiles: @profiles.models

    # Does something need to be destroyed first?
    @setupFlickity()

  setupFlickity: ->
    return if not @profiles.length

    { cells } = initCarousel @$el, wrapAround: true
    { flickity } = cells

    $overlays = @$el.find('.js-gpc-overlay')
    $dots = @$el.find('.js-gpc-dot')

    $overlays.first().fadeIn()

    $dots.on 'click', (e) ->
      e.preventDefault()
      i = $(this).data 'index'
      flickity.select i

    flickity.on 'cellSelect', ->
      $dots.removeClass 'is-active'
      $($dots[flickity.selectedIndex])
        .addClass 'is-active'

      $overlays.fadeOut()
      $overlays.promise().done ->
        $selected = $($overlays[flickity.selectedIndex])
        $selected.fadeIn()

    @$el.find('.js-gpc-next').on 'click', ->
      flickity.next()

    @$el.find('.js-gpc-prev').on 'click', ->
      flickity.previous()

    @profiles.map (profile) =>
      new FollowButtonView
        el: @$el.find(".js-follow-button[data-id='#{profile.id}']")
        following: @following
        model: profile
        modelName: 'profile'
