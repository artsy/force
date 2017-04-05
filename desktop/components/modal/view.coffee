_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator'
Transition = require '../mixins/transition'
{ isTouchDevice } = require '../util/device'
Scrollbar = require '../scrollbar/index'
modalTemplate = -> require('./modal.jade') arguments...

module.exports = class ModalView extends Backbone.View
  id: 'modal'
  container: '#modal-container'

  template: ->
    'Requires a template'
  modalTemplate: ->
    modalTemplate()

  templateData: {}

  __defaults__:
    transition: 'fade'
    backdrop: true
    dimensions:
      width: '400px'

  events: ->
    'click.handler .modal-backdrop': 'onClickBackdrop'
    'click.handler .modal-close': 'close'
    'click.internal .modal-close': '__announceCloseButtonClick__'
    'click.internal .modal-backdrop': '__announceBackdropClick__'

  initialize: (options = {}) ->
    { @dimensions, @width, @transition, @backdrop } = _.defaults options, @__defaults__

    @dimensions.width = @width if @width

    _.extend @templateData, autofocus: @autofocus()

    @resize = _.debounce @updatePosition, 100

    @$window = $(window)
    @$window.on 'keyup', @escape
    @$window.on 'resize', @resize

    @scrollbar = new Scrollbar

    mediator.on 'modal:close', @close, this
    mediator.on 'modal:opened', @updatePosition, this

    @open()

  onClickBackdrop: (e) ->
    @close() if $(e.target).hasClass('modal-backdrop')

  __announceCloseButtonClick__: ->
    @trigger 'click:close'

  __announceBackdropClick__: ->
    @trigger 'click:backdrop'

  escape: (e) ->
    return unless e.which is 27

    mediator.trigger 'modal:close'

  updatePosition: =>
    @$dialog.css
      top: ((@$el.height() - @$dialog.height()) / 2) + 'px'
      left: ((@$el.width() - @$dialog.width()) / 2) + 'px'

  autofocus: ->
    if isTouchDevice() then undefined else true

  isLoading: ->
    @$el.addClass 'is-loading'
    @$dialog.hide().addClass 'is-notransition'

  isLoaded: ->
    @$el.removeClass 'is-loading'
    @$dialog.show()
    _.defer =>
      @$dialog.removeClass 'is-notransition'

  # Fade out body,
  # re-render the (presumably changed) template,
  # then fade back in and re-center
  reRender: ->
    Transition.fade @$body,
      out: =>
        @$body.html @template(@templateData)
        @trigger 'rerendered'
      in: =>
        @updatePosition()

  setDimensions: (dimensions) ->
    @$dialog.css dimensions or @dimensions

  setup: ->
    backdropClass = if @backdrop then 'has-backdrop' else 'has-nobackdrop'

    @$el.
      addClass("is-#{@transition}-in #{backdropClass}").
      # Render outer
      html @modalTemplate()

    @renderInner()

    # Display
    $(@container).html @$el

    @postRender()

    # Disable scroll on body
    @scrollbar.disable()

    # Fade in
    _.defer => @$el.attr 'data-state', 'open'

  renderInner: =>
    @$body = @$('.modal-body')
    @$body.html @template(@templateData)
    @$dialog = @$('.modal-dialog')
    @setDimensions()

  postRender: -> #

  open: =>
    @setup()

    mediator.trigger 'modal:opened', { view: this }

    this

  close: (cb) ->
    @$window.off 'keyup', @escape
    @$window.off 'resize', @resize

    mediator.off null, null, this

    @$el.
      attr('data-state', 'closed').
      one($.support.transition.end, =>
        # Re-enable scrolling
        @scrollbar.reenable()

        mediator.trigger 'modal:closed', { view: this }

        @remove()

        cb() if _.isFunction cb
      ).emulateTransitionEnd 250
