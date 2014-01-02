_ = require 'underscore'

module.exports =

  #
  # Collection models must specify what to sort by through an `alphaSortKey` method
  # Sample output:
  # {
  #   '0-9': [ model_instance, model_instance, model_instance ],
  #   A: [ model_instance, model_instance, model_instance ],
  #   ...
  #   Z: [ model_instance, model_instance, model_instance ]
  # }
  groupByAlpha: ->
    instance = new @model()
    unless _.isFunction instance.alphaSortKey
      throw "You must implement an `alphaSortKey` method for these models."

    @groupBy (model) ->
      key = model.alphaSortKey()
      letter = key[0]
      if /^\d$/.test letter
        '0-9'
      else
        letter.toUpperCase()

  #
  # Groups collection output in a format suitable for rendering in an A-Z list with
  # a specified number of columns.
  #
  # Sample Output:
  # [
  #  { letter: '0-9', columns: [ ... ] },
  #  { letter: 'A', columns: [ ... ] },
  #   ...
  #  { letter: 'Z', columns: [ ... ] }
  # ]
  # Each column is a 2D array of objects with `href`, and `name` properties:
  # columns: [
  #   [ { href: '...', name: '...' }, ... { href: '...', name: '...' } ],
  #   [ { href: '...', name: '...' }, ... { href: '...', name: '...' } ],
  #   [ { href: '...', name: '...' }, ... { href: '...', name: '...' } ]
  # ]
  groupByAlphaWithColumns: (numberOfColumns = 3) ->
    instance = new @model()
    unless _.isFunction instance.href
      throw "You must implement an `href` method for these models."
    unless _.isFunction instance.displayName
      throw "You must implement a `displayName` method for these models."

    itemsByLetter = @groupByAlpha()
    letters = _.keys(itemsByLetter)
    letters.sort()

    itemsToColumns = (items, numberOfColumns) ->
      maxRows = Math.floor(items.length / numberOfColumns)
      items[(i * maxRows + i)..((i + 1) * maxRows + i)] for i in [0...numberOfColumns]

    _.map(letters, (letter) =>
      models = itemsByLetter[letter]
      items = _.map(models,
        (model) ->
          { href: model.href(), name: model.displayName() }
      )
      {
        letter: letter
        columns: itemsToColumns(items, numberOfColumns)
      }
    )
