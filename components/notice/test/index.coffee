Backbone = require 'backbone'
benv = require 'benv'
{ resolve } = require 'path'
Notice = require '../index'

describe 'Notice', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      benv.render resolve(__dirname, '../template.jade'), {}, =>
        done()

  afterEach ->
    benv.teardown()

  describe '#initialize', ->
    it 'requires a message option', ->
      (-> new Notice).should.throw 'You must pass a message option'

    it 'accepts the message option', ->
      flash = new Notice message: 'A caesura'
      flash.message.should.equal 'A caesura'

  it 'correctly adjusts the layout'
