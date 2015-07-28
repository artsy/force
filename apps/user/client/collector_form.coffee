_ = require 'underscore'
Backbone = require 'backbone'
LocationSearchView = require '../../../components/location_search/index.coffee'
UserInterestsView = require '../../../components/user_interests/view.coffee'
IntroductionView = require '../../../components/introduction/index.coffee'
SubForm = require './sub_form.coffee'
template = -> require('../templates/collector.jade') arguments...

module.exports = class CollectorForm extends Backbone.View
  className: 'settings-collector-form'

  initialize: (options = {}) ->
    { @userEdit, @user } = options

    @listenTo @userEdit, 'sync', @syncIntroduction

  syncIntroduction: ->
    @introductionView.update()

  setupIntroduction: ->
    @introductionView = new IntroductionView el: @$('#settings-collector-introduction-preview')

  setupLocationSearch: ->
    @locationSearchView = new LocationSearchView el: @$('#settings-collector-location'), autofocus: false
    @locationSearchView.render @userEdit.location()?.cityStateCountry()
    @listenTo @locationSearchView, 'location:update', (location) =>
      @userEdit.setLocation location

  setupUserInterests: ->
    @userInterestsView = new UserInterestsView
    @$('.js-settings-collector-user-interests').html @userInterestsView.render().$el
    @userInterestsView.collection.fetch()

    @listenTo @userInterestsView.collection, 'sync', @syncIntroduction
    @listenTo @userInterestsView.collection, 'remove', (userInterest) =>
      # Wait for change to persist
      @listenToOnce userInterest, 'sync', @syncIntroduction

  setupForms: ->
    @collectorForm = new SubForm el: @$('#settings-collector-form'), model: @userEdit, user: @user

  postRender: ->
    @setupIntroduction()
    @setupLocationSearch()
    @setupUserInterests()
    @setupForms()

  render: ->
    @$el.html template(user: @userEdit)
    @postRender()
    this

  remove: ->
    @locationSearchView.remove()
    @userInterestsView.remove()
    @collectorForm.remove()
    @introductionView.remove()
    super
