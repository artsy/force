StepView = require './step.coffee'
analytics = require '../../../../lib/analytics.coffee'
UserInterestsView = require '../../../../components/user_interests/view.coffee'
{ setSkipLabel } = require '../mixins/followable.coffee'
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
      analytics.track.funnel 'Added an artist to their collection from /personalize', label: "User:#{@user.id}"
    @listenTo @userInterestsView, 'uncollect', ->
      analytics.track.funnel 'Removed an artist from their collection from /personalize', label: "User:#{@user.id}"

  render: ->
    @$el.html template(state: @state)
    @postRender()
    this

  remove: ->
    @userInterestsView.remove()
    super
