_ = require 'underscore'
Backbone = require 'backbone'
Form = require '../mixins/form.coffee'
mediator = require '../../lib/mediator.coffee'
Cookies = require '../cookies/index.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'
CurrentUser = require '../../models/current_user.coffee'
template = -> require('./template.jade') arguments...

module.exports = class CTABarView extends Backbone.View
  _.extend @prototype, Form

  className: 'cta-bar'

  transitionLength: 500

  events:
    'click .cta-bar-defer': 'close'
    'click .cta-bar-defer-editorial': 'close'
    'click .cta-bar-button': 'onClickButton'
    'submit .cta-bar-form': 'submit'

  defaults:
    name: 'cta_bar'
    mode: 'link'
    persist: true
    linkCopy: 'Join Artsy Now'
    linkHref: '/sign_up'

  initialize: (options = {}) ->
    { @headline, @mode, @name, @persist, @modalOptions, @subHeadline,
      @email, @linkCopy, @linkHref } = _.defaults options, @defaults
    @user = CurrentUser.orNull()
    @$el.attr 'data-mode', @mode

  previouslyDismissed: ->
    @persist and Cookies.get(@name)?

  logDismissal: ->
    if @persist
      if @name is 'editorial-signup-dismissed'
        Cookies.set @name, 1, expires: 864000
      else
        Cookies.set @name, 1, expires: 31536000

  __transition__: (state, cb) ->
    _.defer =>
      @$el.attr 'data-state', state
      _.delay(cb, @transitionLength) if cb?
      $("#cta-bar-form-input").focus()
    this

  transitionIn: (cb) ->
    @__transition__ 'in', cb
    analyticsHooks.trigger 'artist_page:cta:shown'

  transitionOut: (cb) ->
    @__transition__ 'out', cb

  submit: (e) ->
    e.preventDefault()
    @openModal userData: @serializeForm()

  onClickButton: (e) ->
    return if @user
    e.preventDefault()
    @openModal()

  openModal: (options = {}) ->
    @close()
    mediator.trigger 'open:auth', _.extend {
      width: '500px',
      mode: 'register',
      redirectTo: @linkHref
    }, @modalOptions, options

  render: ->
    @$el.html template
      user: @user
      headline: @headline
      mode: @mode
      subHeadline: @subHeadline
      email: @email
      linkCopy: @linkCopy
      linkHref: @linkHref
    this

  close: (e) ->
    e?.preventDefault()
    @logDismissal()
    @transitionOut =>
      @remove()
