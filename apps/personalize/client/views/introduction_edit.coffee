_ = require 'underscore'
ModalView = require '../../../../components/modal/view.coffee'
LocationSearchView = require '../../../../components/location_search/index.coffee'
BookmarksView = require '../../../../components/bookmarks/view.coffee'
Form = require '../../../../components/mixins/form.coffee'
template = -> require('../../templates/introduction_edit.jade') arguments...

module.exports = class IntroductionEditView extends ModalView
  _.extend @prototype, Form

  className: 'personalize-introduction'

  template: ->
    template arguments...

  events: -> _.extend super,
    'submit form': 'submit'
    'click button': 'submit'

  initialize: (options = {}) ->
    { @user } = options
    @templateData = user: @user
    super

  submit: (e) ->
    e.preventDefault()
    return unless @validateForm()
    return if @formIsSubmitting()
    @$('button').attr 'data-state', 'loading'
    @user.save @serializeForm(),
      success: => @close()
      error: => @reenableForm()

  postRender: ->
    @attachLocationSearch()
    @attachBookmarksView()

  attachLocationSearch: ->
    @locationSearchView = new LocationSearchView el: @$('#personalize-collector-location'), autofocus: false
    @locationSearchView.render @user.location()?.cityStateCountry()
    @listenTo @locationSearchView, 'location:update', (location) =>
      @user.setLocation location

  attachBookmarksView: ->
    @bookmarksView = new BookmarksView
      el: @$('#personalize-bookmark-artists')
      mode: 'pre'
      limit: 2
      persist: @user.id?
    # Height changes on render so recenter the modal
    @listenTo @bookmarksView, 'render:collection', @updatePosition

  remove: ->
    @locationSearchView?.remove()
    @bookmarksView?.remove()
    super
