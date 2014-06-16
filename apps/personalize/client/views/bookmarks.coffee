StepView = require './step.coffee'
analytics = require '../../../../lib/analytics.coffee'
BookmarksSearchView = require '../../../../components/bookmarks/view.coffee'
{ setSkipLabel } = require '../mixins/followable.coffee'
analytics = require '../../../../lib/analytics.coffee'
template = -> require('../../templates/bookmarks.jade') arguments...

module.exports = class BookmarksView extends StepView
  setSkipLabel: setSkipLabel

  events:
    'click .personalize-skip': 'advance'

  postRender: ->
    @bookmarksSearchView = new BookmarksSearchView el: @$('#personalize-bookmark-artists'), autofocus: @autofocus()
    @listenTo @bookmarksSearchView, 'collect uncollect', @setSkipLabel
    @listenTo @bookmarksSearchView, 'collect', ->
      analytics.track.funnel 'Added an artist to their collection from /personalize', label: "User:#{@user.id}"
    @listenTo @bookmarksSearchView, 'uncollect', ->
      analytics.track.funnel 'Removed an artist from their collection from /personalize', label: "User:#{@user.id}"

  render: ->
    @$el.html template(state: @state)
    @postRender()
    this

  remove: ->
    @bookmarksSearchView.remove()
    super
