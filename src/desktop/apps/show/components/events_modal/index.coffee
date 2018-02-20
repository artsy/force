modalize = require '../../../../components/modalize/index.coffee'
EventsModalView = require './view.coffee'

module.exports = (options = {}) ->
  view = new EventsModalView options
  modal = modalize view, dimensions: width: '800px'
  modal.open()
  modal
