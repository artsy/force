Backbone = require 'backbone'
Introduction = require '../../../../components/introduction/index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class GalleryIntroView extends Backbone.View
  className: 'settings-gallery-intro'

  initialize: ({ @user }) ->
    @introduction = new Introduction

    { @collectorProfile } = @user.related()
    { @userInterests } = @collectorProfile.related()

    @listenTo @user, 'sync', => @introduction.update()
    @listenTo @userInterests, 'sync', => @introduction.update()
    @listenTo @userInterests, 'remove', (userInterest) =>
      @listenToOnce userInterest, 'sync', => # Wait for change to persist
        @introduction.update()

  postRender: ->
    @$('.js-settings-gallery-intro__preview')
      .html @introduction.render().$el

  render: ->
    @$el.html template()
    @postRender()
    this
