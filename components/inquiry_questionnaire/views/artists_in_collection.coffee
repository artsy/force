StepView = require './step.coffee'
UserInterestsView = require '../../user_interests/view.coffee'
template = -> require('../templates/artists_in_collection.jade') arguments...

module.exports = class ArtistsInCollection extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'next'

  postRender: ->
    { collectorProfile } = @user.related()
    { userInterests } = collectorProfile.related()

    userInterests.fetch silent: true

    @userInterestsView = new UserInterestsView
      collectorProfile: collectorProfile
      collection: userInterests
      autofocus: true

    @$('.js-bookmark-artists').html @userInterestsView.render().$el

  remove: ->
    @userInterestsView.remove()
    super
