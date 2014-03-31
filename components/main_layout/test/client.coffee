benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
sd = require('sharify').data
{ fabricate } = require 'antigravity'

describe 'Layout init code', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: require('jquery') }
      sinon.stub $, 'ajax'
      { @syncAuth } = require '../client'
      done()

  afterEach -> benv.teardown()

  it 'adds a global error handler'