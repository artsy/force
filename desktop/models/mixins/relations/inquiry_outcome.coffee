module.exports =
  related: ->

    Artwork = require '../../artwork'

    inquireable = if @get('inquireable_type')  is 'Artwork'
      new Artwork @get('inquireable')

    @__related__ =
      inquireable: inquireable
