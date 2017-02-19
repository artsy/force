servers = require '../../helpers/servers'
sinon = require 'sinon'
Browser = null

xdescribe '/system/up page', ->

  before (done) ->
    Browser = require 'zombie'
    servers.setup -> done()

  after ->
    servers.teardown()

  it 'returns an ok status when pinged', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/system/up', ->
      browser.wait ->
        JSON.parse(browser.text('body')).nodejs.should.be.ok()
        done()
