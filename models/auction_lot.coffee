Backbone = require 'backbone'

module.exports = class AuctionLot extends Backbone.Model
  parse: (response) ->
    response.estimate_text = @estimateText(response.estimate_text) if response.estimate_text?
    response

  estimateText: (string) ->
    string.replace /\ -\ /, '&nbsp;&ndash;<br>'
