{ PARAMS, CURRENT_USER } = require('sharify').data
modalize = require '../../../../../../components/modalize/index.coffee'
{ history } = require 'backbone'

module.exports = (number) ->
  view = render: -> $el: $ """
    <h1>You placed a bid</h1>
    <h2>Your bidder number is #{CURRENT_USER.paddle_number}</h2>
  """

  view.once 'closed', ->
    history.start pushState: true
    history.navigate data.artwork.href

  modal = modalize view,
    className: 'modalize artwork-auction-confirm-bid-modal'
    dimensions: width: '500px'

  modal.open()
  modal

