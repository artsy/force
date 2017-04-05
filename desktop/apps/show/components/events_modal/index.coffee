modalize = require '../../../../components/modalize/index'
EventsModalView = require './view'

module.exports = (options = {}) ->
  view = new EventsModalView options
  modal = modalize view, dimensions: width: '800px'
  modal.open()
  modal
