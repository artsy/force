_ = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
Backbone = require 'backbone'
Fairs = require '../../../collections/fairs.coffee'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
initCarousel = require '../../../components/merry_go_round/index.coffee'

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

pastFairsTemplate = -> require('../templates/past_fairs.jade') arguments...

module.exports.FairsView = class FairsView extends Backbone.View
  defaults:
    page: 1
    per: 40

  events:
    'click .fairs__promo__sign-up' : 'triggerOpenAuth'
    'click #fairs-see-more' : 'loadMorePastFairs'

  initialize: (options) ->
    { @user, @page, @per } = _.defaults options, @defaults
    @listenTo @collection, 'sync', @renderPastFairs

  setupFollows: (collection)->
    following = new Following [], kind: 'profile' if @user

    ids = collection.map (fair) ->
      $el = $(".profile-follow[data-id='#{fair.related().profile.id}']")

      new FollowButton
        el: $el
        following: following
        modelName: 'profile'
        model: fair.related().profile
        label: fair.get('name')
        analyticsFollowMessage: 'Followed fair, via fairs page'
        analyticsUnfollowMessage: 'Unfollowed fair, via fairs page'

      fair.related().profile.id
    following.syncFollows ids if @user

  triggerOpenAuth: (e)->
    e.preventDefault()
    mediator.trigger 'open:auth',
      mode: 'register'
      copy: "Sign up to follow fairs"

  renderPastFairs: (collection, response)->
    pastFairs = new Fairs response
    Q.allSettled(
      pastFairs.map (fair) -> fair.related().profile.fetch()
    )
    .then =>
      @$('#fairs-see-more').removeClass 'is-loading'
      @$('#fairs-see-more').hide() if response.length < @per
      @$('.fairs__past-fairs-list').append pastFairsTemplate
        pastFairs: pastFairs.filter (fair) -> fair.isPast()

      @setupFollows pastFairs

  loadMorePastFairs: ->
    @page++
    @$('#fairs-see-more').addClass 'is-loading'
    @collection.fetch
      remove: false
      data:
        page: @page
        sort: '-start_at'
        size: @per
        has_full_feature: true

module.exports.init = ->
  fairs = new Fairs sd.FAIRS

  initCarousel $('.js-fairs-promo-carousel'),
    autoPlay: 5000
    imagesLoaded: true
  , (carousel) ->
    carousel.cells.flickity.on 'staticClick', ->
      carousel.cells.flickity.next(true)

  view = new FairsView
    el: $('#fairs-page')
    collection: fairs
    page: 1
    user: CurrentUser.orNull()

  view.setupFollows fairs
