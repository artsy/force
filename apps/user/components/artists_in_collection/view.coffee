Backbone = require 'backbone'
UserInterestsView = require '../../../../components/user_interests/view.coffee'
template = -> require('./template.jade') arguments...

module.exports = class ArtistsInCollectionView extends Backbone.View
  className: 'grouped-section'

  initialize: ->
    { @collectorProfile } = @model.related()
    { @userInterests } = @collectorProfile.related()

  postRender: ->
    @userInterestsView = new UserInterestsView collection: @userInterests
    @$('.js-settings-collector-user-interests').html @userInterestsView.render().$el
    @userInterests.fetch()

  render: ->
    @$el.html template()
    @postRender()
    this
