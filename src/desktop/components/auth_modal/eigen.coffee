{ EIGEN } = require('sharify').data
{ urlMap } = require './maps.coffee'

module.exports =
  path: ->
    window.location.pathname

  redirect: (path) ->
    window.location = path

  checkWith: ({ mode } = {}) ->
    return no if @path() is path = urlMap[mode]

    if EIGEN
      @redirect path
      yes
    else
      no
