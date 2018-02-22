_ = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Profile = require '../../../models/profile.coffee'
initCarousel = require '../../../components/merry_go_round/bottom_nav_mgr.coffee'
metaphysics = require '../../../../lib/metaphysics.coffee'
ViewHelpers = require '../helpers/view_helpers.coffee'
query = require '../query.coffee'

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

pastFairsTemplate = -> require('../templates/past_fairs.jade') arguments...

module.exports.FairsView = class FairsView extends Backbone.View
  events:
    'click .fairs__promo__sign-up' : 'triggerOpenAuth'
    'click #fairs-see-more' : 'loadMorePastFairs'

  initialize: (options) ->
    { @user } = options
    @page = 1

  setupFollows: (fairs)->
    following = new Following [], kind: 'profile' if @user

    ids = _.map(fairs, (fair) ->
      if fair.profile
        $el = $(".profile-follow[data-id='#{fair.profile.id}']")
        if $el.length > 0
          new FollowButton
            el: $el
            following: following
            modelName: 'profile'
            model: new Profile fair.profile
            label: fair.name
            context_page: "Fairs page"

          fair.profile.id
    )

    following.syncFollows ids if @user

  triggerOpenAuth: (e)->
    e.preventDefault()
    mediator.trigger 'open:auth',
      mode: 'register'
      copy: "Sign up to follow fairs"

  renderPastFairs: (fairs)->
    @$('#fairs-see-more').removeClass 'is-loading'
    @$('#fairs-see-more').hide() if fairs.length < 40
    @$('.fairs__past-fairs-list').append pastFairsTemplate
      pastFairs: _.filter(fairs, (fair) => ViewHelpers.isPast(fair))
      ViewHelpers: ViewHelpers

    @setupFollows fairs

  loadMorePastFairs: ->
    @page++
    @$('#fairs-see-more').addClass 'is-loading'
    metaphysics
      variables: page: @page
      query: query
    .then (data) =>
      @renderPastFairs(data.fairs)

module.exports.init = ->
  bootstrappedFairs = sd.FAIRS

  initCarousel $('.js-fairs-promo-carousel'),
    autoPlay: 5000
    imagesLoaded: true
  , (carousel) ->
    carousel.cells.flickity.on 'staticClick', ->
      carousel.cells.flickity.next(true)

  view = new FairsView
    el: $('#fairs-page')
    user: CurrentUser.orNull()

  view.setupFollows bootstrappedFairs
