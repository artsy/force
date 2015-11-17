module.exports =
  related: ->

    Artwork = require '../../artwork.coffee'

    inquireable = if @get('inquireable_type')  is 'Artwork'
      new Artwork @get('inquireable')

    @__related__ =
      inquireable: inquireable
