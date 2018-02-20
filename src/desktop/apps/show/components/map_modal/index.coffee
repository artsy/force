modalize = require '../../../../components/modalize/index.coffee'
MapModalView = require './view.coffee'

module.exports = (options = {}) ->
  view = new MapModalView options
  modal = modalize view, dimensions: width: '820px'
  modal.open()
  modal
