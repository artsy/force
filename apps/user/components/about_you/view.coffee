{ invoke } = require 'underscore'
GenericFormView = require '../generic_form/view.coffee'
LocationSearchView = require '../../../../components/location_search/index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class AboutYouView extends GenericFormView
  subViews: []

  className: 'settings-about-you'

  initialize: ({ @user, @profile }) -> #

  postRender: ->
    city = @model.related().location.toString()
    locationSearchView = new LocationSearchView autofocus: false
    @$('.js-settings-about-you__location')
      .html locationSearchView.render(city).$el

    @listenTo locationSearchView, 'location:update', (value) =>
      @model.setLocation value
      @change()

    @subViews = [
      locationSearchView
    ]

  render: ->
    @$el.html template
      user: @user
      profile: @profile
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
    super
