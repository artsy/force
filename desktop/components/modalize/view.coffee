_ = require 'underscore'
Backbone = require 'backbone'
template = require './templates/index'
Scrollbar = require '../scrollbar/index'

module.exports = class Modalize extends Backbone.View
  className: 'modalize'

  defaults:
    dimensions:
      width: '400px'
    backdropCloses: true

  events:
    'click .js-modalize-backdrop': 'maybeClose'
    'click .js-modalize-close': 'clickClose'

  initialize: (options = {}) ->
    { @subView, @dimensions, @backdropCloses } = _.defaults options, @defaults
    @scrollbar = new Scrollbar
    $(window).on 'keyup.modalize', @escape

  state: (state, callback = $.noop) -> _.defer =>
    @$el
      .attr 'data-state', state
      .one $.support.transition.end, callback
      .emulateTransitionEnd 250

  dialog: (state, callback = $.noop) ->
    duration = {
      slide: 500, fade: 250, bounce: 500
    }[state.replace /-in|-out$/, '']

    @$dialog
      .attr 'data-state', state
      .one $.support.transition.end, callback
      .emulateTransitionEnd duration

  __render__: ->
    @$el.html template()
    @__rendered__ = true
    @scrollbar.disable()
    @state 'open'
    this

  render: ->
    unless @__rendered__
      @__render__()
      @trigger 'opening'
    @postRender()
    this

  __postRender__: ->
    (@$dialog = @$('.js-modalize-dialog')).css @dimensions
    (@$body = @$('.js-modalize-body')).html @subView.render().$el
    @__postRendered__ = true
    this

  postRender: ->
    unless @__postRendered__
      @__postRender__()
      @trigger 'opened'
    else
      @subView.render().$el
    this

  escape: (e) =>
    @close(null, e) if e.which is 27

  maybeClose: (e) ->
    @close(null, e) if @backdropCloses and $(e.target).hasClass('js-modalize-backdrop')

  clickClose: (e) ->
    @close(null, e)

  # Used programmatically which expects this order of params
  # so use clickClose to handle the click handler param ordering
  close: (callback, e) ->
    $(window).off 'keyup.modalize'
    @scrollbar.reenable()
    @trigger 'closing'
    @state 'close', =>
      @subView?.remove?()
      @remove()
      callback?()
      @trigger 'closed', e
