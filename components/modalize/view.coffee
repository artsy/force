_ = require 'underscore'
Backbone = require 'backbone'
template = require './templates/index.coffee'
Scrollbar = require '../scrollbar/index.coffee'

module.exports = class Modalize extends Backbone.View
  className: 'modalize'

  defaults: dimensions: width: '400px'

  events:
    'click .js-modalize-backdrop': 'maybeClose'
    'click .js-modalize-close': 'close'

  initialize: (options = {}) ->
    { @subView, @dimensions } = _.defaults options, @defaults
    @scrollbar = new Scrollbar

  state: (state, callback = $.noop) ->
    _.defer =>
      @$el
        .attr 'data-state', state
        .one $.support.transition.end, callback
        .emulateTransitionEnd 250

  render: ->
    @$el.html template()
    @postRender()
    this

  postRender: ->
    @$('.js-modalize-body')
      .css @dimensions
      .html @subView.render().$el

    @scrollbar.disable()

    @state 'open'

  maybeClose: (e) ->
    @close() if $(e.target).hasClass('js-modalize-backdrop')

  close: (callback) ->
    @scrollbar.reenable()

    @state 'close', =>
      @subView?.remove?()
      @remove()
      callback?()
