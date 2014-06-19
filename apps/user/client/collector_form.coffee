_ = require 'underscore'
Backbone = require 'backbone'
LocationSearchView = require '../../../components/location_search/index.coffee'
BookmarksView = require '../../../components/bookmarks/view.coffee'
Introduction = require '../../../components/after_inquiry/introduction.coffee'
SubForm = require './sub_form.coffee'
template = -> require('../templates/collector.jade') arguments...

module.exports = class CollectorForm extends Backbone.View
  className: 'settings-collector-form'

  initialize: (options = {}) ->
    { @userEdit } = options

    @listenTo @userEdit, 'sync', @renderIntroduction

  renderIntroduction: ->
    (@$introduction ?= @$('#settings-collector-introduction-preview').addClass 'is-fade-in')
      .text new Introduction(@userEdit, @bookmarksView.bookmarks).blurb()

  setupLocationSearch: ->
    @locationSearchView = new LocationSearchView el: @$('#settings-collector-location'), autofocus: false
    @locationSearchView.render @userEdit.location()?.cityStateCountry()
    @listenTo @locationSearchView, 'location:update', (location) =>
      @userEdit.setLocation location

  setupBookmarks: ->
   @bookmarksView = new BookmarksView el: @$('#settings-collector-bookmarks')
   @listenTo @bookmarksView.bookmarks, 'sync add remove', @renderIntroduction
   @renderIntroduction()

  setupForms: ->
    @collectorForm = new SubForm el: @$('#settings-collector-form'), model: @userEdit, user: @userEdit

  postRender: ->
    @setupLocationSearch()
    @setupBookmarks()
    @setupForms()

  render: ->
    @$el.html template(user: @userEdit)
    @postRender()
    this

  remove: ->
    @locationSearchView.remove()
    @bookmarksView.remove()
    @collectorForm.remove()
    super
