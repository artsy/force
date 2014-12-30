Backbone = require 'backbone'
modes = require '../modes.coffee'

module.exports = class State extends Backbone.Model
  defaults:
    mode: 'initial'
    step: 1

  @modes: modes

  mode: ->
    modes[@get('mode')]

  route: ->
    "/apply/#{@mode().slug}"
