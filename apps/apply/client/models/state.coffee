Backbone = require 'backbone'
modes = require '../modes.coffee'

module.exports = class State extends Backbone.Model
  defaults:
    mode: 'initial'
    step: 1

  modes: modes

  mode: ->
    modes[@get('mode')]

  copy: (key) ->
    @mode().copy[key]

  value: (key) ->
    @mode().value[key]

  route: ->
    "/apply/#{@mode().slug}"
