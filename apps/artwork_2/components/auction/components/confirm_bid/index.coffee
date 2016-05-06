modalize = require '../../../../../../components/modalize/index.coffee'

module.exports = (number) ->
  view = render: -> $el: $ """
    <h1>You placed a bid</h1>
    <h2>Your bidder number is #{number}</h2>
  """

  modal = modalize view,
    className: 'modalize artwork-auction-confirm-bid-modal'
    dimensions: '500px'

  modal.open()
  modal
