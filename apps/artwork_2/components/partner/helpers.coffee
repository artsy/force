{ uniq, compact } = require 'underscore'
{ numberFormat } = require 'underscore.string'

module.exports =
  isDisplayable: ({ type }) ->
    type in ['Gallery', 'Institution']

  numberFormat: numberFormat

  pluralize: (word, count, irregular = null) ->
    if count is 1
      word
    else
      irregular or word + 's'

  cities: (locations) ->
    uniq compact(locations.map ({ city }) -> city?.trim())
      .join ' • '
