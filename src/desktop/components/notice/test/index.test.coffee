benv = require 'benv'
Backbone = require 'backbone'
Notice = require '../index'

describe 'Notice', ->
  beforeEach (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  afterEach ->
    benv.teardown()

  describe '#render', ->
    it 'renders the message', ->
      notice = new Notice message: 'A caesura'
      notice.render().$el.html().should.containEql 'A caesura'
