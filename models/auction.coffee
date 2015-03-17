Sale = require './sale.coffee'

module.exports = class Auction extends Sale
  href: ->
    "/auction/#{@id}"

  registrationSuccessUrl: ->
    "#{@href()}/confirm-registration"
