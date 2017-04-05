modalize = require '../modalize/index'
ShareView = require './view'

module.exports = (options = {}) ->
  view = new ShareView options

  modal = modalize view,
    className: 'modalize share-modal'
    dimensions: width: '350px'

  modal.open()
  modal
