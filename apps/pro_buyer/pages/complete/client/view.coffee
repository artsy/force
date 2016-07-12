Promise = require 'bluebird-q'
{ stringify } = require 'qs'
{ invoke, pick, last } = require 'underscore'
{ startsWith } = require 'underscore.string'
{ View, Model } = require 'backbone'
{ isPhoneLike } = require '../../../../../components/util/device.coffee'
analyticsHooks = require '../../../../../lib/analytics_hooks.coffee'
Form = require '../../../../../components/form/index.coffee'
LocationSearchView = require '../../../../../components/location_search/index.coffee'
confirmation = require '../../../../../components/confirmation/index.coffee'
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

    # If the URL is the default value; remove
    # the http:// so that it passes validation
    $url = @$('input[name="company_website"]')
    urlValue = $url.val()
    if urlValue is 'http://'
      $url.val ''

    # Prepend with http:// if not blank and missing protocol.
    else if urlValue isnt '' and not startsWith(urlValue, 'http://')
      $url.val "http://#{urlValue}"

    form = new Form $form: @$('form')
    return unless form.isReady()

    form.state 'loading'

    data = form.data location: @user.related().location.toJSON()

    if data.price_range?
      [ data.price_range_min = min
        data.price_range_max = max ] = data.price_range.split ':'

    Promise
      .all [
        @user.save pick data, [
          'profession'
          'location'
          'price_range_min'
          'price_range_max'
          'collector_level'
        ]...

        @user.related().collectorProfile.save pick data, [
          'professional_buyer'
          'company_website'
          'company_name'
        ]...
      ]
      .then =>
        Promise @user.refresh()
          .catch console.error.bind console

      .then =>
        @confirm() unless isPhoneLike()
        @redirectTo '/collect',
          source: 'professional-buyer'
          price_range: @priceRange()

      .catch (err) ->
        form.error err
        analyticsHooks.trigger 'pro_buyer:complete:error',
          error_messages: [form.errors.parse err]

  priceRange: ->
    unless @user.get('price_range') is '-1:1000000000000' # No budget in mind
      [50, @user.get 'price_range_max'].join '-'

  confirm: ->
    confirmation.register
      title: 'Thank You for Joining'
      message: '''
        Make Artsy work for you: Follow artists, galleries, and
        categories to get alerts when new works are available.
      '''
      confirm:
        href: '/personalize?force=artists'
        label: 'Personalize your Account'
      ignore:
        label: 'Maybe later, start browsing'

  redirectTo: (path, options = {}) ->
    location.assign "#{path}?#{stringify options}"

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
