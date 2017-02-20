servers = require '../../../test/helpers/servers'
Browser = null
sinon = require 'sinon'

xdescribe 'Homepage', ->

  before (done) ->
    Browser = require 'zombie'
    servers.setup -> done()

  after ->
    servers.teardown()

  it 'intializes the client-side homepage view', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000', ->
      browser.wait ->
        $ajaxSpy = sinon.spy browser.window.$, 'ajax'
        browser.window.$(browser.window).trigger 'infiniteScroll'
        $ajaxSpy.args[0][0].url.should.containEql '/api/v1/shows/feed'
        done()
