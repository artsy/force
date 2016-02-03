Q = require 'bluebird-q'
Backbone = require 'backbone'
GenericFormView = require '../generic_form/view.coffee'
Form = require '../../../../components/form/index.coffee'
FlashMessage = require '../../../../components/flash/index.coffee'
LocationSearchView = require '../../../../components/location_search/index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class AboutYouView extends Backbone.View
  className: 'settings-about-you'

  events:
    'input input': 'change'
    'click button': 'submit'

  initialize: ({ @user, @profile }) -> #

  change: GenericFormView::change

  submit: (e) ->
    e.preventDefault()

    form = new Form $form: @$('form')
    return unless form.isReady()

    form.state 'loading'

    # Form manages attributes for both User and Profile
    # so we need to split them out and save to each model
    Q.all [
      @profile.save form.serializer.pick 'handle', 'bio', 'website'
      @user.save form.serializer.pick 'profession'
    ]
      .then =>
        form
          .state 'default'
          .reenable()

        @user.refresh()

        new FlashMessage message: 'Your settings have been saved'

      .catch form.error.bind form

  postRender: ->
    city = @model.related().location.toString()
    @locationSearchView = new LocationSearchView autofocus: false
    @$('.js-settings-about-you__location')
      .html @locationSearchView.render(city).$el

    @listenTo @locationSearchView, 'location:update', (value) =>
      @model.setLocation value
      @change()

  render: ->
    @$el.html template
      user: @user
      profile: @profile
    @postRender()
    this

  remove: ->
    @locationSearchView.remove()
    super
