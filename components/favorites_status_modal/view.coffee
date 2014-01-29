_         = require 'underscore'
ModalView = require '../modal/view.coffee'
mediator  = require '../../lib/mediator.coffee'
template  = -> require('./templates/make_public.jade') arguments...

#
# Modal view to prompt a user to change her favorites collection to public
#
module.exports = class FavoritesStatusModal extends ModalView

  template: (data) -> template data

  className: 'favorites'

  events: -> _.extend super,
    'click .make-public': 'makePublic'
    'click .cancel': 'cancel'

  makePublic: ->
    mediator.trigger 'favorites:make:public'
    @close()

  cancel: ->
    @close()
