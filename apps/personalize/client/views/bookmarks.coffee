StepView = require './step.coffee'
analytics = require '../../../../lib/analytics.coffee'
BookmarksSearchView = require '../../../../components/bookmarks/view.coffee'
{ setSkipLabel } = require '../mixins/followable.coffee'
template = -> require('../../templates/bookmarks.jade') arguments...

module.exports = class BookmarksView extends StepView
  setSkipLabel: setSkipLabel

  events:
    'click .personalize-skip': 'advance'

  postRender: ->
    @bookmarksSearchView = new BookmarksSearchView el: @$('#personalize-bookmark-artists'), autofocus: @autofocus()
    @listenTo @bookmarksSearchView, 'collect uncollect', @setSkipLabel

  render: ->
    @$el.html template(state: @state)
    @postRender()
    this

  remove: ->
    @bookmarksSearchView.remove()
    super
