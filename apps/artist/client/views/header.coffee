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
        if section.active = Backbone.history.fragment.split('?')[0] is section.href
          clone[i - 1]?.rel = 'prev'
          clone[i + 1]?.rel = 'next'

  updateHeadTags: (sections) ->
    $tags = _.map ['prev', 'next'], (rel) ->
      $("link[rel='#{rel}']").remove()
      if href = _.findWhere(sections, rel: rel)?.href
        $('<link>').attr rel: rel, href: "#{location.host}/#{href}"
    (@$head ?= $('head')).append $tags

  renderNav: ->
    @updateHeadTags sections = @navData(@data.returns)
    (@$nav ?= @$('#artist-tabs'))
      .html navTemplate
        artist: @model
        sections: sections
