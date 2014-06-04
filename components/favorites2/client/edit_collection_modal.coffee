_ = require 'underscore'
ModalView = require '../../modal/view.coffee'
newTemplate = -> require('../templates/new_collection_modal.jade') arguments...
editTemplate = -> require('../templates/edit_collection_modal.jade') arguments...

module.exports = class EditCollectionModal extends ModalView

  template: (locals) =>
    (if @collection.isNew() then newTemplate else editTemplate) _.extend locals,
      collection: @collection

  initialize: ({ @collection }) ->
    super

  postRender: ->
    @$('input').focus()

  events: -> _.extend super,
    'click .favorites2-edit-modal-cancel': 'close'
    'click .favorites2-edit-modal-submit': 'submit'
    'click .favorites2-edit-modal-delete, .favorites2-edit-modal-cancel-delete': 'toggleDelete'
    'click .favorites2-edit-modal-delete-confirm': 'delete'

  submit: ->
    @collection.save { name: @$('input').val() }
    @close()

  toggleDelete: ->
    @$('.favorites2-edit-modal-delete-container, .favorites2-edit-modal-init').toggle()

  delete: ->
    @collection.destroy()
    @close()
