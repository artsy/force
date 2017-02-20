module.exports =
  path: ->
    location.pathname

  current: ->
    @path().replace /\/$/, ''

  test: (pattern) ->
    new RegExp(pattern).test @current()
