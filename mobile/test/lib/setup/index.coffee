setup = require '../../../lib/setup'
Backbone = require 'backbone'
express = require 'express'
sd = require('sharify').data
config = require '../../../config'
sinon = require 'sinon'

xdescribe 'Project setup', ->

  before ->
    @app = express()
    setup @app

  it 'adds the gravity xapp token', ->
    require('artsy-xapp-middleware').token = 'foobarbaz'
    Backbone.sync.editRequest { set: setStub = sinon.stub() }
    setStub.args[0][0]['X-XAPP-TOKEN'].should.equal 'foobarbaz'
