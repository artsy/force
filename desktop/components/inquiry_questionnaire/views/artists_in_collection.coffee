StepView = require './step'
UserInterestsView = require '../../user_interests/view'
template = -> require('../templates/artists_in_collection.jade') arguments...

module.exports = class ArtistsInCollection extends StepView
  template: -> template arguments...

  shouldAutofocus: false

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

    @$('.js-user-interests').html @userInterestsView.render().$el

  remove: ->
    @userInterestsView.remove()
    super
