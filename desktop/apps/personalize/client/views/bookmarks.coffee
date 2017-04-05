StepView = require './step'
analyticsHooks = require '../../../../lib/analytics_hooks'
UserInterestsView = require '../../../../components/user_interests/view'
{ setSkipLabel } = require '../mixins/followable'
template = -> require('../../templates/bookmarks.jade') arguments...

module.exports = class BookmarksView extends StepView
  setSkipLabel: setSkipLabel

  events:
    'click .personalize-skip': 'advance'

  postRender: ->
    @userInterestsView = new UserInterestsView autofocus: @autofocus()
    @$('#personalize-bookmark-artists').html @userInterestsView.render().$el

    @userInterests = @userInterestsView.collection
    @userInterests.fetch()

    @listenTo @userInterests, 'add remove', @setSkipLabel
    @listenTo @userInterests, 'add', ->
      analyticsHooks.trigger 'personalize:added-artist'

    @listenTo @userInterestsView, 'uncollect', ->
      analyticsHooks.trigger 'personalize:removed-artist'

  render: ->
    @$el.html template(state: @state)
    @postRender()
    this

  remove: ->
    @userInterestsView.remove()
    super
