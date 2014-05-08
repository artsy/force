_         = require 'underscore'
ModalView = require '../modal/view.coffee'
mediator  = require '../../lib/mediator.coffee'
template  = -> require('./templates/make_public.jade') arguments...

{ readCookie, createCookie } = require '../util/cookie.coffee'

#
# Modal view to prompt a user to change her favorites collection to public
# `width` and `top` can be passed in as params when creation. If no `top`
# passed, it will be positioned in the middle, like original Modal component.
#
module.exports = class FavoritesStatusModal extends ModalView

  template: (data) -> template data

  cookieKey : 'favorites_publish_prompt'
  className : 'favorites-status-modal'

  events: -> _.extend super,
    'click .make-public' : 'makePublic'
    'click .cancel'      : 'cancel'

  initialize: (options = {}) ->
    { @top } = options

    if readCookie(@cookieKey)?
      # Has already seen this... ignore
      return @remove()

    super options

  seen: ->
    # Will see this once until cookie expires
    createCookie @cookieKey, true, 365

  makePublic: ->
    mediator.trigger 'favorites:make:public'
    @close()

  cancel: ->
    @seen()
    @close()

  # Override modal's updatePosition function
  updatePosition: =>
    super
    @$dialog.css top: @top unless not @top?
