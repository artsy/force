modalize = require '../../modalize/index.coffee'
ConfirmationModal = require './view.coffee'

module.exports = (data) ->
  return unless data?

  view = new ConfirmationModal data: data

  modal = modalize view,
    dimensions: width: '500px'

  view.once 'action', ->
    modal.close()

  modal.open()
  modal
