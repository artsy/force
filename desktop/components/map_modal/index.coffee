modalize = require '../modalize/index'
MapModalView = require './view'

module.exports = (options = {}) ->
  view = new MapModalView options
  modal = modalize view, dimensions: width: '820px'
  modal.open()
  modal
