servers = require '../../../test/helpers/servers'
Browser = require 'zombie'

describe 'Static page', ->

  before (done) ->
    servers.setup -> done()

  after ->
    servers.teardown()

  it 'shows the page contents', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/terms', ->
      browser.wait ->
        browser.html().should.containEql 'This <em>page</em> is awesome!'
        done()
