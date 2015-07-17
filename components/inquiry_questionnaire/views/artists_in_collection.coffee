StepView = require './step.coffee'
UserInterestsView = require '../../user_interests/view.coffee'
template = -> require('../templates/artists_in_collection.jade') arguments...

module.exports = class ArtistsInCollection extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'next'

  postRender: ->
    @userInterestsView = new UserInterestsView
      collectorProfile: @user.related().collectorProfile
      autofocus: true
    @$('.js-bookmark-artists').html @userInterestsView.render().$el
    @userInterestsView.collection.fetch()

  remove: ->
    @userInterestsView.remove()
    super
