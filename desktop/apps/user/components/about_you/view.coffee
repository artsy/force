{ extend, invoke } = require 'underscore'
GenericFormView = require '../generic_form/view'
LocationSearchView = require '../../../../components/location_search/index'
template = -> require('./index.jade') arguments...

module.exports = class AboutYouView extends GenericFormView
  subViews: []

  className: 'settings-about-you'

  events: extend GenericFormView::events,
    'change select[name="price_range"]': 'priceRange'

  initialize: ({ @user }) -> #

  priceRange: (e) ->
    [min, max] = $(e.currentTarget).val().split ':'
    @user.set price_range_min: min, price_range_max: max

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
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
    super
