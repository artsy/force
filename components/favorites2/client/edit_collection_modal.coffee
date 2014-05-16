_ = require 'underscore'
ModalView = require '../../modal/view.coffee'
newTemplate = -> require('../templates/new_collection_modal.jade') arguments...
editTemplate = -> 'moo'

module.exports = class EditCollectionModal extends ModalView

  template: =>
    (if @collection.isNew() then newTemplate else editTemplate) arguments...

  initialize: ({ @collection }) ->
    super

  events: -> _.extend super,
    'click .favorites2-edit-modal-cancel': 'close'
    'click .favorites2-edit-modal-submit': 'submit'

  submit: ->
    @collection.save { name: @$('input').val() }
    @close()