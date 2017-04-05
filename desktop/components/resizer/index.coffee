config = require './config'
SERVICES =
  EMBEDLY: require './services/embedly'
  GEMINI: require './services/gemini'

service = ->
  SERVICES[config.proxy]

module.exports =
  resize: ->
    service().resize arguments...
  crop: ->
    service().crop arguments...
  fill: ->
    service().fill arguments...
