_                   = require 'underscore'
Backbone            = require 'backbone'
mediator            = require '../../lib/mediator.coffee'
Transition          = require '../mixins/transition.coffee'
{ isTouchDevice }   = require '../../components/util/device.coffee'
Scrollbar           = require '../../lib/scrollbar.coffee'

modalTemplate = -> require('./modal.jade') arguments...

module.exports = class ModalView extends Backbone.View
  id: 'modal'
  container: '#modal-container'

  template: ->
    'Requires a template'

  templateData: {}

  events: ->
    'click.handler .modal-backdrop' : 'close'
    'click.handler .modal-close'    : 'close'

    'click.internal .modal-dialog'   : '__intercept__'
    'click.internal .modal-close'    : '__announceCloseButtonClick__'
    'click.internal .modal-backdrop' : '__announceBackdropClick__'

  initialize: (options = {}) ->
    { @width, @transition, @backdrop } = _.defaults options, width: '400px', transition: 'fade', backdrop: true

    _.extend @templateData, autofocus: @autofocus()

    @resize = _.debounce @updatePosition, 100

    @$window = $(window)
    @$window.on 'keyup', @escape
    @$window.on 'resize', @resize

    @scrollbar = new Scrollbar $els: $('#main-layout-header')

    mediator.on 'modal:close', @close, this
    mediator.on 'modal:opened', @updatePosition, this

    @open()

  __intercept__: (e) ->
    e.stopPropagation()

  __announceCloseButtonClick__: ->
    @trigger 'click:close'

  __announceBackdropClick__: ->
    @trigger 'click:backdrop'

  escape: (e) ->
    return unless e.which is 27

    mediator.trigger 'modal:close'

  updatePosition: =>
    @$dialog.css
      top:  ((@$el.height() - @$dialog.height()) / 2) + 'px'
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

  setWidth: (width) ->
    @$dialog.css { width: width or @width }

  setup: ->
    backdropClass = if @backdrop then 'has-backdrop' else 'has-nobackdrop'

    @$el.
      addClass("is-#{@transition}-in #{backdropClass}").
      # Render outer
      html modalTemplate()

    @renderInner()

    # Display
    $(@container).html @$el

    @postRender()

    # Disable scroll on body
    @scrollbar.set()

    # Fade in
    _.defer => @$el.attr 'data-state', 'open'

  renderInner: =>
    @$body = @$('.modal-body')
    @$body.html @template(@templateData)
    @$dialog = @$('.modal-dialog')
    @setWidth()

  postRender: -> #

  open: ->
    @setup()

    mediator.trigger 'modal:opened'

    this

  close: (cb) ->
    @$window.off 'keyup', @escape
    @$window.off 'resize', @resize

    mediator.off null, null, this

    @$el.
      attr('data-state', 'closed').
      one($.support.transition.end, =>
        # Re-enable scrolling
        @scrollbar.reset()

        mediator.trigger 'modal:closed'

        @remove()

        cb() if _.isFunction cb
      ).emulateTransitionEnd 250
