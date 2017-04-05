modalize = require '../../modalize/index'
CreditCardView = require './view'

module.exports = ({ collection } = {}) ->
  view = new CreditCardView collection: collection

  modal = modalize view,
    dimensions: width: '800px', height: '800px'

  view.once 'abort done', ->
    modal.close()

  modal.open()
  modal
