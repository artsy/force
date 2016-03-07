modalize = require '../../modalize/index.coffee'
CreditCardView = require './view.coffee'

module.exports = ({ collection } = {}) ->
  view = new CreditCardView collection: collection

  modal = modalize view,
    dimensions: width: '800px', height: '800px'

  view.once 'abort done', ->
    modal.close()

  modal.open()
  modal
