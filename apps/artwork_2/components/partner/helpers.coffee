{ uniq } = require 'underscore'
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
    uniq locations.map ({ city }) -> city
      .join ' • '
