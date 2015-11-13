benv = require 'benv'
sinon = require 'sinon'
teleport = require '../../client/teleport.coffee'

describe 'teleport', ->
  beforeEach (done) ->
    benv.setup =>

      done()

  afterEach ->
    benv.teardown()

  it 'creates a link to click', ->
    teleportation = teleport "http://google.com/"
    teleportation.event.target.href.should.equal "http://google.com/"
    teleportation.didDispatch.should.equal true