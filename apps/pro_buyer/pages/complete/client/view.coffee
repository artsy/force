{ invoke } = require 'underscore'
{ View, Model } = require 'backbone'
Form = require '../../../../../components/form/index.coffee'
LocationSearchView = require '../../../../../components/location_search/index.coffee'
templates =
  page: -> require('../templates/page.jade') arguments...
  profession: -> require('../templates/profession.jade') arguments...

module.exports = class ProfessionalBuyerCompleteView extends View
  events:
    'change .js-profession select': 'setProfession'
    'click button': 'submit'

  initialize: ({ @user }) ->
    @listenTo @user, 'change:profession', @renderProfession

  setProfession: (e) ->
    @user.set 'profession', $(e.currentTarget).val()

  renderProfession: ->
    @$('.js-profession')
      .html templates.profession user: @user

  submit: (e) ->
    e.preventDefault()

    model = new Model
    model.url = '/professional-buyer/complete'

    form = new Form $form: @$('form'), model: model
    return unless form.isReady()

    form.state 'loading'

    model.save form.data(location: @user.related().location.toJSON()),
      error: form.error.bind form
      success: ->
        form.state 'success'
        alert JSON.stringify(model.toJSON())

  postRender: ->
    city = @user.related().location.toString()
    locationSearchView = new LocationSearchView autofocus: false

    @listenTo locationSearchView, 'location:update', (value) =>
      @user.setLocation value

    @$('.js-location')
      .replaceWith locationSearchView.render(city).$el

    @subViews = [
      locationSearchView
    ]

  render: ->
    @$el.html templates.page
      user: @user
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
    super
