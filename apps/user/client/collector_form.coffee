Backbone = require 'backbone'
AboutYouFormView = require '../components/about_you/view.coffee'
AdvancedCollectorSettingsFormView = require '../components/advanced_collector_settings/view.coffee'
ArtistsInCollectionView = require '../components/artists_in_collection/view.coffee'
IntroductionView = require '../components/introduction/view.coffee'

module.exports = class CollectorForm extends Backbone.View
  className: 'settings-collector-form'

  initialize: ({ @userEdit }) ->
    @aboutYouFormView = new AboutYouFormView model: @userEdit
    @advancedCollectorSettingsFormView = new AdvancedCollectorSettingsFormView model: @userEdit
    @artistsInCollectionView = new ArtistsInCollectionView model: @userEdit
    @introductionView = new IntroductionView model: @userEdit

  render: ->
    @$el.html [
      @aboutYouFormView.render().$el
      @advancedCollectorSettingsFormView.render().$el
      @artistsInCollectionView.render().$el
      @introductionView.render().$el
    ]
    this

  remove: ->
    @aboutYouFormView.remove()
    @advancedCollectorSettingsFormView.remove()
    @artistsInCollectionView.remove()
    @introductionView.remove()
    super
