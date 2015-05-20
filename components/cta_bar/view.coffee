_ = require 'underscore'
Backbone = require 'backbone'
Form = require '../mixins/form.coffee'
AuthModalView = require '../auth_modal/view.coffee'
Cookies = require '../cookies/index.coffee'
template = -> require('./template.jade') arguments...

module.exports = class CTABarView extends Backbone.View
  _.extend @prototype, Form

  className: 'cta-bar'

  transitionLength: 500

  events:
    'click .cta-bar-defer': 'close'
    'click .cta-bar-button': 'signUp'
    'submit .cta-bar-form': 'submit'

  defaults:
    name: 'cta_bar'
    mode: 'link'
    persist: true

  initialize: (options = {}) ->
    { @headline, @mode, @name, @persist, @modalOptions, @subHeadline, @email } = _.defaults options, @defaults

  previouslyDismissed: ->
    @persist and Cookies.get(@name)?

  logDimissal: ->
    if @persist
      Cookies.set @name, 1, expires: 31536000

  __transition__: (state, cb) ->
    _.defer =>
      @$el.attr 'data-state', state
      _.delay(cb, @transitionLength) if cb?
    this

  transitionIn: (cb) ->
    @__transition__ 'in', cb

  transitionOut: (cb) ->
    @__transition__ 'out', cb

  submit: (e) ->
    e.preventDefault()
    @openModal userData: @serializeForm()

  signUp: (e) ->
    e.preventDefault()
    @openModal()

  openModal: (options = {}) ->
    @close()
    new AuthModalView _.extend {
      width: '500px', mode: 'register'
    }, @modalOptions, options

  render: ->
    @$el.html template
      headline: @headline
      mode: @mode
      subHeadline: @subHeadline
      email: @email
    this

  close: (e) ->
    e?.preventDefault()
    @logDimissal()
    @transitionOut =>
      @remove()
