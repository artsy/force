{ GEMINI_LOAD_RATIO } = require('sharify').data
config = require './config.coffee'
SERVICES =
  EMBEDLY: require './services/embedly.coffee'
  GEMINI: require './services/gemini.coffee'

oneIn = (n) ->
  Math.floor(Math.random() * n) is 0

service = ->
  SERVICES[if oneIn(GEMINI_LOAD_RATIO) then 'GEMINI' else config.proxy]

module.exports =
  resize: ->
    service().resize arguments...
  crop: ->
    service().crop arguments...
  fill: ->
    service().fill arguments...
