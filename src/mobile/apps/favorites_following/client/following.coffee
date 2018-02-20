Backbone = require 'backbone'
FollowProfiles = require '../../../collections/follow_profiles.coffee'
Profiles = require '../../../collections/profiles.coffee'
profilesTemplate = -> require('../templates/profiles.jade') arguments...

module.exports = class FollowingView extends Backbone.View
  initialize: (options = {}) ->
    @following = new FollowProfiles
    @listenTo @following, 'sync', @appendProfiles
    @following.fetch()
    @setupInfiniteScroll()

  setupInfiniteScroll: ->
    @page = 1
    $.onInfiniteScroll =>
      return if @finishedScrolling
      @page++
      @following.fetch
        data: page: @page
        success: (followProfiles, res) =>
          if res.length is 0
            @finishedScrolling = true

  appendProfiles: ->
    profiles = new Profiles(@following.pluck 'profile')
    (@$list ?= @$('#favorites-following-profiles-list'))
      .append profilesTemplate profiles: profiles.models
