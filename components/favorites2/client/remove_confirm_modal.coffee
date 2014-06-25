_ = require 'underscore'
ModalView = require '../../modal/view.coffee'
template = -> require('../templates/remove_confirm_modal.jade') arguments...

module.exports = class RemoveConfirmModal extends ModalView

  template: template

  initialize: (options) ->
    { @collections, @artworkId, @collection, @artwork } = options
    super

  events: -> _.extend super,
    'click .favorites2-edit-modal-cancel-delete': 'close'
    'click .favorites2-edit-modal-delete-confirm': 'delete'

  delete: (e) ->
    if @collections
      @collections.removeArtwork @artworkId
    else if @collection
      @collection.removeArtwork @artwork
    @close()