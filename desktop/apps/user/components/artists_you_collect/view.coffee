Backbone = require 'backbone'
UserInterestsView = require '../../../../components/user_interests/view'
template = -> require('./index.jade') arguments...

module.exports = class ArtistsYouCollectView extends Backbone.View
  className: 'settings-artists-you-collect'

  initialize: ({ @user }) ->
    { @collectorProfile } = @user.related()
    { @userInterests } = @collectorProfile.related()

  postRender: ->
    @userInterestsView = new UserInterestsView collection: @userInterests
    @$('.js-artists-you-collect__user-interests')
      .html @userInterestsView.render().$el
    @userInterests.fetch()

  render: ->
    @$el.html template()
    @postRender()
    this
