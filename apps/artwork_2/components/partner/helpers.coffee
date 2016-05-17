{ uniq, compact } = require 'underscore'

module.exports =
  isDisplayable: (partner) ->
    partner? and partner.type in ['Gallery', 'Institution']

  cities: (locations) ->
    uniq compact(locations.map ({ city }) -> city?.trim())
      .join ' • '
