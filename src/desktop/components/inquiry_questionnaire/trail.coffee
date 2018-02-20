module.exports = class Trail
  constructor: ->
    @reset()

  reset: ->
    @breadcrumbs = []

  log: (breadcrumb) ->
    @breadcrumbs.push breadcrumb

  toString: ->
    @breadcrumbs.join ','
