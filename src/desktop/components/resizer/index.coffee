config = require './config.coffee'
SERVICES =
  GEMINI: require './services/gemini.coffee'

service = ->
  SERVICES[config.proxy]

module.exports =
  resize: ->
    service().resize arguments...
  crop: ->
    service().crop arguments...
  fill: ->
    service().fill arguments...
