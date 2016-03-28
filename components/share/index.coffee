modalize = require '../modalize/index.coffee'
ShareView = require './view.coffee'

module.exports = (options = {}) ->
  view = new ShareView options

  modal = modalize view,
    className: 'modalize share-modal'
    dimensions: width: '350px'

  modal.open()
  modal
