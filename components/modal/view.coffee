_                 = require 'underscore'
Backbone          = require 'backbone'
mediator          = require '../../lib/mediator.coffee'
modalTemplate     = -> require('./modal.jade') arguments...
Transition        = require '../mixins/transition.coffee'
{ isTouchDevice } = require '../../components/util/device.coffee'

module.exports = class ModalView extends Backbone.View
  id: 'modal'
  container: '#modal-container'

  template: ->
    'Requires a template'

  events: ->
    'click .modal-backdrop': 'close'
    'click .modal-close': 'close'
    'click .modal-dialog': '_intercept'

  initialize: (options = {}) ->
    { @width } = _.defaults options, { width: '400px' }

    @templateData ?= {}

    @resize = _.debounce @updatePosition, 100

    @$window = $(window)
    @$window.on 'keyup', @escape
    @$window.on 'resize', @resize

    mediator.on 'modal:close', @close, this
    mediator.on 'modal:opened', @updatePosition, this

    @open()

  _intercept: (e) ->
    e.stopPropagation()

  escape: (e) ->
    return unless e.which is 27

    mediator.trigger 'modal:close'

  updatePosition: =>
    @$dialog.css
      top:  ((@$window.height() - @$dialog.height()) / 2) + 'px'
      left: ((@$window.width() - @$dialog.width()) / 2) + 'px'

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
      out:  => @$body.html @template(@templateData)
      in:   => @updatePosition()

  setWidth: (width) ->
    @$dialog.css { width: width or @width }

  setup: ->
    # Render outer
    @$el.html modalTemplate()

    # Render inner
    @$body = @$('.modal-body')
    @$body.html @template(@templateData)
    @$dialog = @$('.modal-dialog')
    @setWidth()

    # Add autofocus on non-touch devices
    unless isTouchDevice()
      @$el.find(":input:first").attr autofocus: true

    # Display
    $(@container).html @$el

    @postRender()

    # Disable scroll on body
    $('body').addClass 'is-modal'

    # Fade in
    _.defer => @$el.attr 'data-state', 'open'

  postRender: -> #

  open: ->
    @setup()

    mediator.trigger 'modal:opened'

    this

  close: ->
    @$window.off 'keyup', @escape
    @$window.off 'resize', @resize

    mediator.off null, null, this

    @$el.
      attr('data-state', 'closed').
      one($.support.transition.end, =>
        # Re-enable scrolling
        $('body').removeClass 'is-modal'

        mediator.trigger 'modal:closed'

        @remove()
      ).emulateTransitionEnd 250
