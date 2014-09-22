_ = require 'underscore'
Backbone = require 'backbone'
ShareView = require '../../../../components/share/view.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
navTemplate = -> require('../../templates/nav.jade') arguments...

module.exports = class ArtistHeaderView extends Backbone.View
  events:
    'click #artist-tabs a': 'intercept'

  initialize: ({ @user, @data }) ->
    @setupShareButtons()
    @setupFollowButton()
    @maybeRemoveEmptyNotice()

  intercept: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true

  setupShareButtons: ->
    new ShareView el: @$('.artist-share')

  setupFollowButton: ->
    @following = new Following(null, kind: 'artist') if @user
    new FollowButton
      analyticsFollowMessage: 'Followed artist, via artist header'
      analyticsUnfollowMessage: 'Unfollowed artist, via artist header'
      el: @$('#artist-follow-button')
      following: @following
      modelName: 'artist'
      model: @model
    @following?.syncFollows [@model.id]

  maybeRemoveEmptyNotice: ->
    @listenToOnce @data, 'sync:all', =>
      if @model.artworks.length
        @$('.artist-header-empty').remove()

  navData: (sections) ->
    _.tap JSON.parse(JSON.stringify sections), (clone) =>
      _.each clone, (section, i) =>
        section.href = section.href.replace ':id', @model.id
        if section.active = Backbone.history.fragment is section.href
          clone[i - 1]?.rel = 'prev'
          clone[i + 1]?.rel = 'next'

  renderNav: ->
    (@$nav ?= @$('#artist-tabs'))
      .html navTemplate
        artist: @model
        sections: @navData(@data.returns)
