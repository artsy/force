benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
teleport = rewire '../../client/teleport.coffee'

describe 'teleport', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose({ Event: window.Event })
      teleport.__set__ 'sd', { EIGEN: true }
      done()

  afterEach ->
    benv.teardown()

  it 'creates a link to click', ->
    teleportation = teleport "http://google.com/"
    teleportation.event.target.href.should.equal "http://google.com/"
    teleportation.didDispatch.should.equal true
