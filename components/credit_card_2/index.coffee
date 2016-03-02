modalize = require '../modalize/index.coffee'
CreditCardView = require './view.coffee'

module.exports = ({ user } = {}) ->
  view = new CreditCardView user: user

  modal = modalize view,
    dimensions: width: '800px', height: '640px'

  view.once 'abort done', modal.close

  modal.open()
  modal
