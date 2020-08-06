Backbone = require 'backbone'
{ defer } = require 'underscore'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
FillwidthView = require '../../../../components/fillwidth_row/view.coffee'
Profiles = require '../../../../collections/profiles.coffee'
QuasiInfiniteView = require '../quasi_infinite/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class GalleriesInstitutionsView extends QuasiInfiniteView
  className: 'settings-galleries-institutions'

  kind: 'profiles'

  initialize: ({ @user }) ->
    @params = new Backbone.Model
      total_count: true
      size: 10
      page: 1

    @profiles = new Profiles
    @collection = new Following [], kind: 'profile'
    @allFollows = new Following [], kind: 'profile'

    @listenTo @collection, 'sync', @syncFollows

    super

  syncFollows: (follows) ->
    @allFollows.add follows.models

  renderCount: 0

  postRender: ->
    return unless @collection.length

    begin = @profiles.length
    @profiles.add @collection.pluck 'profile'
    end = @profiles.length

    profiles = new Profiles @profiles.slice begin, end

    @$(@selectors.collection)[if @renderCount is 0 then 'html' else 'append'] template
      profiles: profiles

    profiles.each (profile) =>
      view = new FollowButton
        el: @$(".js-entity-follow[data-id='#{profile.id}']")
        following: @allFollows
        modelName: 'profile'
        model: profile
        context_page: "User settings page"

      @subViews.push view

    @renderCount += 1
