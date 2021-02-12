Location = require './location.coffee'

module.exports = class FairLocation extends Location

  singleLine: ->
    @get 'display'

  toJSONLD: -> @singleLine()
