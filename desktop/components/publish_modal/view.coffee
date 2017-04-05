_ = require 'underscore'
ModalView = require '../modal/view'
mediator = require '../../lib/mediator'
template = -> require('./template.jade') arguments...
Cookies = require 'cookies-js'

module.exports = class PublishModal extends ModalView
  className: 'publish-modal'

  template: template

  events: -> _.extend super,
    'click .make-public': 'makePublic'
    'click .cancel': 'cancel'

  initialize: (options = {}) ->
    { @name, @publishEvent, @message, @persist, @top } = _.defaults(options, persist: true)

    unless @name and @publishEvent and @message
      throw new Error('You must pass a name, publishEvent, and message')

    if @persist and Cookies.get(@name)?
      # Has already seen this... ignore
      return @remove()

    @templateData = message: @message

    super options

  seen: ->
    # Will see this once until cookie expires
    Cookies.set @name, true, expires: 60 * 60 * 24 * 365

  makePublic: (e) ->
    e.preventDefault()
    mediator.trigger @publishEvent
    @close()

  cancel: (e) ->
    e.preventDefault()
    @seen()
    @close()

  # Override modal's updatePosition function
  updatePosition: =>
    super
    @$dialog.css top: @top unless not @top?
