config = require './config.coffee'
SERVICES =
  EMBEDLY: require './services/embedly.coffee'
  GEMINI: require './services/gemini.coffee'

oneIn = (n) ->
  Math.floor(Math.random() * n) is 0

service = ->
  # Will enable this later to drive 1/N requests to Gemini:
  # delegateTo = if oneIn(GEMINI_LOAD_RATIO) then 'GEMINI' else 'EMBEDLY'
  SERVICES[config.proxy]

module.exports =
  resize: ->
    service().resize arguments...
  crop: ->
    service().crop arguments...
  fill: ->
    service().fill arguments...
