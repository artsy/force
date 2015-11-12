Backbone = require 'backbone'
Introduction = require '../../../../components/introduction/index.coffee'
template = -> require('./template.jade') arguments...

module.exports = class IntroductionView extends Backbone.View
  className: 'grouped-section'

  initialize: ->
    @introduction = new Introduction

    { @collectorProfile } = @model.related()
    { @userInterests } = @collectorProfile.related()

    @listenTo @userInterests, 'sync', => @introduction.update()
    @listenTo @userInterests, 'remove', (userInterest) =>
      @listenToOnce userInterest, 'sync', => @introduction.update() # Wait for change to persist

  postRender: ->
    @$('.js-settings-collector-introduction-preview').html @introduction.render().$el

  render: ->
    @$el.html template()
    @postRender()
    this
